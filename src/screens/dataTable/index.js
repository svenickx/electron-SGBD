import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header";
import AddData from "../../components/modals/addData";
import "./dataTable.css";
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
    <div className="App">
      {createWindowOpen && (
        <AddData
          setCreateWindowOpen={setCreateWindowOpen}
          addData={addData}
          keys={keys}
          setNewData={createNewData}
        />
      )}
      <Header db={table.dbName} table={tableName} />
      <div className="Body-wrapper">
        <div className="Body-content">
          <h2>DATA</h2>
          <div className="Table-container">
            <table>
              <thead>
                <tr>
                  {keys.map((k, i) => {
                    return (
                      <th style={{ margin: 5 }} key={i}>
                        <div className="resizeable">{k}</div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {data.map((d) => {
                  return (
                    <tr key={d.id}>
                      {keys.map((k, i) => {
                        return (
                          <td key={i}>
                            <div>{d[k] ? d[k] : <i>null</i>}</div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
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

export default DataTable;
