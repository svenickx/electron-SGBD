import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/header";
import CreateTable from "../../components/modals/createTable";
import "./tables.css";

const Tables = () => {
  let { db } = useParams();
  const [DB, setDB] = useState({});
  const [createWindowOpen, setCreateWindowOpen] = useState(false);
  const [loadDBdone, setLoadDBdone] = useState(false);
  const [newTableName, setNewTableName] = useState("");

  const createTable = () => {
    if (newTableName === "") {
      return;
    }
    window.DB.createTable(
      setDB,
      `${window.path.getPath()}\\db.json`,
      `${window.path.getPath()}\\data.json`,
      db,
      newTableName
    );
    setNewTableName("");
  };

  useEffect(() => {
    if (!loadDBdone) {
      window.DB.openDB(setDB, `${window.path.getPath()}\\db.json`, db);
      setLoadDBdone(true);
    }
  }, []);

  return (
    <div className="App">
      {createWindowOpen && (
        <CreateTable
          setData={setNewTableName}
          addData={createTable}
          setCreateWindowOpen={setCreateWindowOpen}
        />
      )}
      <Header db={db} />
      <div className="Body-wrapper">
        <div className="Body-content">
          <h2>Tables</h2>
          {DB.tables &&
            DB.tables.map((t) => {
              return (
                <div key={t.name} className="Db-view">
                  <Link to={`/dataTable/${db}/${t.name}`}>{t.name}</Link>
                </div>
              );
            })}
          <div className="Db-view"></div>
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
};

export default Tables;
