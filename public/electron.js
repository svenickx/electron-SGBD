// Module to control the application lifecycle and the native browser window.
const { app, BrowserWindow, protocol, ipcMain, dialog } = require("electron");
const path = require("path");
const url = require("url");
const fs = require("fs");

// Create the native browser window.
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    // Set the path of an additional "preload" script that can be used to
    // communicate between node-land and browser-land.
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  ipcMain.on("open-file-dialog", (event) => {
    dialog
      .showOpenDialog(mainWindow, {
        properties: ["openDirectory"],
      })
      .then((result) => {
        // se lance quand on a selectionner le dossier
        if (
          !fs.existsSync(`${result.filePaths[0]}\\db.json`) ||
          !fs.existsSync(`${result.filePaths[0]}\\data.json`)
        ) {
          fs.writeFileSync(`${result.filePaths[0]}\\db.json`, "[]");
          fs.writeFileSync(`${result.filePaths[0]}\\data.json`, "[]");
        }
        event.reply("selected-folder", result.filePaths[0]);
      })
      .catch((err) => {
        console.error(err);
        dialog.showErrorBox("Error", "Something went wrong");
      });
  });

  // In production, set the initial browser path to the local bundle generated
  // by the Create React App build process.
  // In development, set it to localhost to allow live/hot-reloading.
  const appURL = app.isPackaged
    ? url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true,
      })
    : "http://localhost:3000";
  mainWindow.loadURL(appURL);

  // Automatically open Chrome's DevTools in development mode.
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
}

// Register a custom protocol for loading local files.
const localFileProtocol = () => {
  const protocolName = "safe-file";
  // https://www.electronjs.org/fr/docs/latest/api/protocol#protocolregisterfileprotocolscheme-handler
  protocol.registerFileProtocol(protocolName, (request, callback) => {
    const url = request.url.replace(`${protocolName}://`, "");
    try {
      return callback(decodeURIComponent(url));
    } catch (error) {
      // Handle the error as needed
      console.error(error);
    }
  });
};

// Setup a local proxy to adjust the paths of requested files when loading
// them from the local production bundle (e.g.: local fonts, etc...).
function setupLocalFilesNormalizerProxy() {
  protocol.registerHttpProtocol(
    "file",
    (request, callback) => {
      const url = request.url.substr(8);
      callback({ path: path.normalize(`${__dirname}/${url}`) });
    },
    (error) => {
      if (error) console.error("Failed to register protocol");
    }
  );
}

// This method will be called when Electron has finished its initialization and
// is ready to create the browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  setupLocalFilesNormalizerProxy();
  localFileProtocol();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  ipcMain.on("readDB", async (event, path) => {
    await readFile(path)
      .then((data) => {
        event.reply("readDBdone", JSON.parse(data));
      })
      .catch((error) => {
        console.error("handle error: " + error);
      });
  });

  ipcMain.on("createDB", async (event, path, database) => {
    await createDB(path, database)
      .then((data) => {
        event.reply("createDBdone", data);
      })
      .catch((error) => {
        console.error("handle error: " + error);
      });
  });

  ipcMain.on("openDB", async (event, path, database) => {
    await readFile(path)
      .then((data) => {
        const databases = JSON.parse(data);
        const currentDB = databases.find((d) => d.name === database);
        event.reply("openDBdone", currentDB);
      })
      .catch((error) => {
        console.error("handle error: " + error);
      });
  });

  ipcMain.on("openTable", async (event, path, dbName, tableName) => {
    await readFile(path)
      .then((data) => {
        const databases = JSON.parse(data);
        const db = databases.find((d) => d.name === dbName);
        const table = db.tables.find((t) => t.name === tableName);
        event.reply("openTableDone", { dbName: db.name, table });
      })
      .catch((error) => {
        console.error("handle error: " + error);
      });
  });

  ipcMain.on(
    "createTable",
    async (event, dbPath, dataPath, dbName, tableName) => {
      await createTable(dbPath, dataPath, dbName, tableName)
        .then((data) => {
          event.reply("createTableDone", data);
        })
        .catch((error) => {
          console.error("handle error: " + error);
        });
    }
  );

  ipcMain.on("getData", async (event, path, dbName, tableName) => {
    await readFile(path)
      .then((data) => {
        const fullData = JSON.parse(data);
        const currentData = fullData.find(
          (d) => d.dbName === dbName && d.tableName === tableName
        );
        event.reply("getDataDone", currentData.values);
      })
      .catch((error) => {
        console.error("handle error: " + error);
      });
  });

  ipcMain.on("addData", async (event, path, data, dbName, tableName) => {
    await addData(path, data, dbName, tableName)
      .then((data) => {
        event.reply("addDataDone", data);
      })
      .catch((error) => {
        console.error("handle error: " + error);
      });
  });
});

function createDB(path, database) {
  return new Promise((resolve, reject) => {
    readFile(path)
      .then((data) => {
        const db = JSON.parse(data);
        db.push({ ...database, tables: [] });
        fs.writeFile(path, JSON.stringify(db), (err) => {
          if (err) {
            console.error(err);
          }
          resolve(db);
        });
      })
      .catch((err) => console.error(err));
  });
}

function createTable(dbPath, dataPath, dbName, tableName) {
  return new Promise((resolve, reject) => {
    let currentDb = [];
    readFile(dbPath)
      .then((data) => {
        const db = JSON.parse(data);
        currentDb = db.find((d) => d.name === dbName);
        if (!currentDb) return;
        if (currentDb.tables.some((t) => t.name === tableName)) return;
        currentDb.tables.push({ name: tableName });
        fs.writeFile(dbPath, JSON.stringify(db), (err) => {
          if (err) console.error(err);
        });
      })
      .catch((err) => console.error(err));
    readFile(dataPath)
      .then((res) => {
        const resJson = JSON.parse(res);
        resJson.push({ dbName, tableName, values: [] });
        fs.writeFile(dataPath, JSON.stringify(resJson), (err) => {
          if (err) console.error(err);
          resolve(currentDb);
        });
      })
      .catch((err) => console.error(err));
  });
}

function addData(path, data, dbName, tableName) {
  return new Promise((resolve, reject) => {
    readFile(path)
      .then((res) => {
        const resJson = JSON.parse(res);
        const d = resJson.find(
          (d) => d.dbName === dbName && d.tableName === tableName
        );
        d.values.push(data);
        fs.writeFile(path, JSON.stringify(resJson), (err) => {
          if (err) {
            console.error(d.values);
          }
          resolve(d.values);
        });
      })
      .catch((err) => console.error(err));
  });
}

function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (error, data) => {
      if (error) {
        console.error("reject: " + error);
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

// Quit when all windows are closed, except on macOS.
// There, it's common for applications and their menu bar to stay active until
// the user quits  explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// If your app has no need to navigate or only needs to navigate to known pages,
// it is a good idea to limit navigation outright to that known scope,
// disallowing any other kinds of navigation.
const allowedNavigationDestinations = "https://my-electron-app.com";
app.on("web-contents-created", (event, contents) => {
  contents.on("will-navigate", (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);

    if (!allowedNavigationDestinations.includes(parsedUrl.origin)) {
      event.preventDefault();
    }
  });
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
