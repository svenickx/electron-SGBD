import { useState } from "react";
import "./App.css";
import Header from "./components/header";

function App() {
  const [createWindowOpen, setCreateWindowOpen] = useState(false);
  const [newDBName, setNewDBName] = useState("");
  const [newDbTables, setNewDbTables] = useState([{}]);
  const [error, setError] = useState(null);

  const [fakeDBs, setFakeDBs] = useState([
    {
      name: "DB1",
      tables: [
        { name: "table1" },
        { name: "table2" },
        { name: "table3" },
        { name: "table4" },
      ],
      isVisible: true,
    },
    {
      name: "DB2",
      tables: [
        { name: "table1" },
        { name: "table2" },
        { name: "table3" },
        { name: "table4" },
      ],
      isVisible: false,
    },
    {
      name: "DB3",
      tables: [
        { name: "table1" },
        { name: "table2" },
        { name: "table3" },
        { name: "table4" },
      ],
      isVisible: false,
    },
  ]);

  const createDB = () => {
    if (newDBName === "") {
      setError(
        `Impossible de créer la base de donnée avec le nom suivant: "${newDBName}"`
      );
      return;
    }
    if (newDbTables.length <= 0) {
      setError(
        `Impossible de créer la base de donnée, veuillez ajouter au moins une table`
      );
      return;
    }

    if (fakeDBs.some((db) => db.name === newDBName)) {
      console.log("DB already existing");
      return;
    }
    setFakeDBs([...fakeDBs, { name: newDBName }]);
  };

  const toggleTablesView = (db) => {
    setFakeDBs(
      fakeDBs.map((d) => {
        if (d.name === db.name) {
          d.isVisible = !d.isVisible;
        }
        return d;
      })
    );
  };

  return (
    <div className="App">
      {createWindowOpen ? (
        <div className="Create-modal-wrapper">
          <div className="Create-modal">
            <h3>Create a new database</h3>
            <div>
              <div>
                <label>Name</label>
                <input
                  type="text"
                  onChange={(event) => setNewDBName(event.target.value)}
                />
              </div>
              <div className="Tables-container">
                <label>Tables</label>
                <div className="Create-tables">
                  {newDbTables.map((_, index) => {
                    return (
                      <div key={index}>
                        <input
                          placeholder={`New table ${index}`}
                          onChange={(event) =>
                            (newDbTables[index] = { name: event.target.value })
                          }
                        />
                        {newDbTables.length > 1 ? (
                          <button
                            onClick={() => {
                              let newTables = [...newDbTables];
                              newTables.splice(index, 1);
                              setNewDbTables(newTables);
                            }}
                          >
                            Delete
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
                </div>
                <button
                  className="Create-modal-button"
                  onClick={() => setNewDbTables([...newDbTables, {}])}
                >
                  Add a field
                </button>
              </div>
            </div>
            <div className="Create-modal-actions">
              <button
                onClick={() => setCreateWindowOpen(false)}
                className="Create-modal-cancel"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  createDB();
                  setCreateWindowOpen(false);
                }}
                className="Create-modal-confirm"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <Header />
      <div className="Body-wrapper">
        <div className="Body-content">
          <h2>Your databases</h2>
          {fakeDBs.map((db) => {
            return (
              <div className="Db-view" key={db.name}>
                <div className="Db-name">
                  <div
                    onClick={() => toggleTablesView(db)}
                    className={`${
                      db.isVisible ? "v-icon-active" : "v-icon-inactive"
                    }`}
                  ></div>
                  <p>{db.name}</p>
                </div>
                <div className="Tables-view">
                  {db.isVisible
                    ? db.tables.map((table) => {
                        return <div key={table.name}>{table.name}</div>;
                      })
                    : ""}
                </div>
              </div>
            );
          })}
          {error !== null ? <p className="Create-error">{error}</p> : ""}
        </div>
        <div className="Create-container">
          <button
            onClick={() => setCreateWindowOpen(true)}
            className="Create-button"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

{
  /* <header className="App-header">
        <button
          className="File-Opener"
          onClick={window.dialog.openDialog()}
          title="Choose file"
        >
          Sélectionner un fichier
        </button>
      </header> */
}
