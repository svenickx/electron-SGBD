import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header";
import CreateDB from "../../components/modals/createDB";
import "./home.css";

function Home() {
  const [createWindowOpen, setCreateWindowOpen] = useState(false);
  const [newDBName, setNewDBName] = useState("");
  const [newDbTables, setNewDbTables] = useState([{}]);
  const [error, setError] = useState(null);
  const [readDBdone, setReadDBdone] = useState(false);

  const [fakeDBs, setFakeDBs] = useState([
    {
      name: "DB1",
      tables: [
        { name: "table1" },
        { name: "table2" },
        { name: "table3" },
        { name: "table4" },
      ],
      isVisible: false,
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

  useEffect(() => {
    if (!readDBdone) {
      const db = window.DB.getDB();
      console.log(db);
      // setFakeDBs(db);
    }
    setReadDBdone(true);
  }, [readDBdone]);

  return (
    <div className="App">
      {createWindowOpen ? (
        <CreateDB
          createDB={createDB}
          newDbTables={newDbTables}
          setCreateWindowOpen={setCreateWindowOpen}
          setNewDBName={setNewDBName}
          setNewDbTables={setNewDbTables}
        />
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
                  <Link to={`/tables/${db.name}`}>{db.name}</Link>
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

export default Home;
