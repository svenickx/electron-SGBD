import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header";
import CreateTable from "../../components/modals/createTable";
import Settings from "../../components/settings";
import { App, BodyWrapper, BodyContent, DbView, ErrorText } from "../../style";

const Tables = () => {
  let { db } = useParams();
  const [DB, setDB] = useState({});
  const [createWindowOpen, setCreateWindowOpen] = useState(false);
  const [loadDBdone, setLoadDBdone] = useState(false);
  const [error, setError] = useState(null);
  const [newTableName, setNewTableName] = useState("");
  const navigate = useNavigate();

  const createTable = () => {
    if (newTableName === "") {
      return;
    }
    if (DB.tables.some((db) => db.name === newTableName)) {
      setError(`Impossible de créer la table, le nom existe déjà`);
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
    if (window.path.getPath() === "") {
      navigate("/databases");
    }
    if (!loadDBdone) {
      window.DB.openDB(setDB, `${window.path.getPath()}\\db.json`, db);
      setLoadDBdone(true);
    }
  }, []);

  return (
    <App>
      {createWindowOpen && (
        <CreateTable
          setData={setNewTableName}
          addData={createTable}
          setCreateWindowOpen={setCreateWindowOpen}
        />
      )}
      <Header db={db} />
      <BodyWrapper>
        <BodyContent>
          <h2>Tables</h2>
          {DB.tables &&
            DB.tables.map((t) => {
              return (
                <DbView key={t.name}>
                  <Link to={`/dataTable/${db}/${t.name}`} className="link">
                    {t.name}
                  </Link>
                </DbView>
              );
            })}
          {error !== null && <ErrorText>{error}</ErrorText>}
          <div className="Db-view"></div>
        </BodyContent>
        <Settings
          isCreateEnable={true}
          setCreateWindowOpen={setCreateWindowOpen}
        />
      </BodyWrapper>
    </App>
  );
};

export default Tables;
