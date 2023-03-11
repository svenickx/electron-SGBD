import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header";
import AddData from "../../components/modals/addData";
import { App, BodyWrapper, BodyContent } from "../../style";
import { Resizeable, Table, TableData, TableHeader, TableRow } from "./style";
import Settings from "../../components/settings";
const uuid = require("uuid");

const DataTable = () => {
  let { dbName, tableName } = useParams();
  const [table, setTable] = useState({});
  const [loadTableDone, setLoadTableDone] = useState(false);
  const [data, setData] = useState([]);
  const [loadDataDone, setLoadDataDone] = useState(false);
  const [keys, setKeys] = useState([]);
  const [createWindowOpen, setCreateWindowOpen] = useState(false);
  const [newData, setNewData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const createNewData = (key, value) => {
    const data = {};
    data[key] = value;
    setNewData({ ...newData, ...data });
  };

  const addData = () => {
    window.DB.addData(
      setData,
      `${window.path.getPath()}\\data.json`,
      {
        id: uuid.v4(),
        ...newData,
      },
      dbName,
      tableName
    );
    setNewData({});
  };

  useEffect(() => {
    if (window.path.getPath() === "") {
      navigate("/databases");
    }
    if (!loadTableDone) {
      window.DB.openTable(
        setTable,
        `${window.path.getPath()}\\db.json`,
        dbName,
        tableName
      );
      setLoadTableDone(true);
    }
  }, []);

  useEffect(() => {
    if (!loadDataDone) {
      window.DB.getData(
        setData,
        `${window.path.getPath()}\\data.json`,
        dbName,
        tableName
      );
      setLoadDataDone(true);
    }
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const tempKeys = [];
      data.forEach((element) => {
        Object.keys(element).forEach((key) => {
          if (!tempKeys.includes(key)) {
            tempKeys.push(key);
          }
        });
        setKeys(tempKeys);
      });
    }
  }, [data]);

  return (
    <App>
      {createWindowOpen && (
        <AddData
          setCreateWindowOpen={setCreateWindowOpen}
          addData={addData}
          keys={keys}
          setNewData={createNewData}
        />
      )}
      <Header db={table.dbName} table={tableName} />
      <BodyWrapper>
        <BodyContent>
          <h2>DATA</h2>
          <div className="Table-container">
            <Table>
              <thead>
                <TableRow>
                  {keys.map((k, i) => {
                    return (
                      <TableHeader style={{ margin: 5 }} key={i}>
                        <Resizeable>{k}</Resizeable>
                      </TableHeader>
                    );
                  })}
                </TableRow>
              </thead>
              <tbody>
                {data.map((d) => {
                  return (
                    <TableRow key={d.id}>
                      {keys.map((k, i) => {
                        return (
                          <TableData key={i}>
                            <div>{d[k] ? d[k] : <i>null</i>}</div>
                          </TableData>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </BodyContent>
        <Settings
          isCreateEnable={true}
          setCreateWindowOpen={setCreateWindowOpen}
        />
      </BodyWrapper>
    </App>
  );
};

export default DataTable;
