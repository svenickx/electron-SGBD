// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require("electron");

// la variable suivante se réinitialise au redémarrage, peut etre la stocker dans un fichier
let folderPath = "";

process.once("loaded", () => {
  contextBridge.exposeInMainWorld("path", {
    getPath: () => {
      return folderPath;
    },
    setPath: (path) => {
      folderPath = path;
    },
  });
  contextBridge.exposeInMainWorld("dialog", {
    open: () => {
      ipcRenderer.send("open-file-dialog");
    },
    setFilePath: (setPath, changeFolderPath) => {
      ipcRenderer.on("selected-folder", (event, path) => {
        if (changeFolderPath) {
          folderPath = path;
        }
        setPath(path);
      });
    },
    removeEventListener: () => {
      ipcRenderer.removeAllListeners("selected-folder");
    },
  });
  contextBridge.exposeInMainWorld("importFile", {
    import: (path, dbName, tableName, setState) => {
      ipcRenderer.send("import-file", path, dbName, tableName);
      ipcRenderer.on("addMultipleDataDone", (event, data) => {
        setState(data);
      });
    },
    removeEventListener: () => {
      ipcRenderer.removeAllListeners("selected-folder");
    },
  });
  contextBridge.exposeInMainWorld("exportFile", {
    export: (path, dataToExport) => {
      ipcRenderer.send("exportFile", path, dataToExport);
    },
    removeEventListener: () => {
      ipcRenderer.removeAllListeners("selected-folder");
    },
  });
  contextBridge.exposeInMainWorld("electronFile", {
    loadFile(setState, path) {
      ipcRenderer.send("readDB", path);
      ipcRenderer.on("readDBdone", (event, data) => {
        setState(data);
      });
    },
  });
  contextBridge.exposeInMainWorld("DB", {
    createDB(setState, path, database) {
      ipcRenderer.send("createDB", path, database);
      ipcRenderer.on("createDBdone", (event, data) => {
        setState(data);
      });
    },
    openDB(setState, path, database) {
      ipcRenderer.send("openDB", path, database);
      ipcRenderer.on("openDBdone", (event, data) => {
        setState(data);
      });
    },
    closeDB() {
      folderPath = "";
    },
    openTable(setState, path, dbName, tableName) {
      ipcRenderer.send("openTable", path, dbName, tableName);
      ipcRenderer.on("openTableDone", (event, data) => {
        setState(data);
      });
    },
    createTable(setState, dbPath, dataPath, dbName, tableName) {
      ipcRenderer.send("createTable", dbPath, dataPath, dbName, tableName);
      ipcRenderer.on("createTableDone", (event, data) => {
        setState(data);
      });
    },
    getData(setState, path, dbName, tableName) {
      ipcRenderer.send("getData", path, dbName, tableName);
      ipcRenderer.on("getDataDone", (event, data) => {
        setState(data);
      });
    },
    addData(setState, path, newData, dbName, tableName) {
      ipcRenderer.send("addData", path, newData, dbName, tableName);
      ipcRenderer.on("addDataDone", (event, data) => {
        setState(data);
      });
    },
    editData(path, newData, dbName, tableName) {
      ipcRenderer.send("editData", path, newData, dbName, tableName);
    },
    deleteData(setState, path, id, dbName, tableName) {
      ipcRenderer.send("deleteData", path, id, dbName, tableName);
      ipcRenderer.on("deleteDataDone", (event, data) => {
        setState(data);
      });
    },
  });
});
