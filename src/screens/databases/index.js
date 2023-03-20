import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header";
import CreateDB from "../../components/modals/createDB";
import { useNavigate } from "react-router-dom";
import { DbName, DropdownTable, TablesView, Title } from "./style";
import Settings from "../../components/settings";
import { App, BodyWrapper, DbView, BodyContent, ErrorText } from "../../style";
const uuid = require("uuid");

function Databases() {
  const [isLoadingDatabases, setIsLoadingDatabases] = useState(true);
  const [Databases, setDatabases] = useState([]);
  const [createWindowOpen, setCreateWindowOpen] = useState(false);
  const [newDBName, setNewDBName] = useState("");
  const [error, setError] = useState(null);
  const [path, setPath] = useState("");
  const [isPathSet, setIsPathSet] = useState(false);
  const navigate = useNavigate();

  const createDB = () => {
    if (newDBName === "") {
      setError(`Impossible de créer la base de donnée avec un nom vide`);
      return;
    }
    if (Databases.some((db) => db.name === newDBName)) {
      setError(`Impossible de créer la base de donnée, le nom existe déjà`);
      return;
    }

    setError(null);
    window.DB.createDB(setDatabases, `${window.path.getPath()}\\db.json`, {
      id: uuid.v4(),
      name: newDBName,
      isVisible: false,
    });
  };

  const toggleTablesView = (db) => {
    setDatabases(
      Databases.map((d) => {
        if (d.name === db.name) {
          d.isVisible = !d.isVisible;
        }
        return d;
      })
    );
  };

  useEffect(() => {
    if (window.path.getPath() !== "") {
      setPath(window.path.getPath());
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (path !== "" && path !== "undefined\\db.json") {
      setIsPathSet(true);
    }
  }, [path]);

  useEffect(() => {
    if (isLoadingDatabases && isPathSet) {
      window.electronFile.loadFile(
        setDatabases,
        `${window.path.getPath()}\\db.json`
      );
      setIsLoadingDatabases(true);
    }
  }, [isLoadingDatabases, isPathSet]);

  return (
    <App>
      {createWindowOpen && (
        <CreateDB
          createDB={createDB}
          setCreateWindowOpen={setCreateWindowOpen}
          setNewDBName={setNewDBName}
        />
      )}
      <Header />
      <BodyWrapper>
        <BodyContent>
          <Title>Your databases</Title>
          {Databases.map((db) => {
            return (
              <DbView key={db.name}>
                <DbName>
                  <DropdownTable
                    isActive={db.isVisible}
                    onClick={() => toggleTablesView(db)}
                  />
                  <Link to={`/tables/${db.name}`} className="link">
                    {db.name}
                  </Link>
                </DbName>
                <TablesView>
                  {db.isVisible &&
                    db.tables &&
                    db.tables.map((table) => {
                      return (
                        <div key={table.name}>
                          <Link
                            to={`/dataTable/${db.name}/${table.name}`}
                            className="link"
                          >
                            {table.name}
                          </Link>
                        </div>
                      );
                    })}
                </TablesView>
              </DbView>
            );
          })}
          {error !== null && <ErrorText>{error}</ErrorText>}
        </BodyContent>
        <Settings
          isCreateEnable={true}
          setCreateWindowOpen={setCreateWindowOpen}
          isLeaveEnable={true}
        />
      </BodyWrapper>
    </App>
  );
}

export default Databases;
