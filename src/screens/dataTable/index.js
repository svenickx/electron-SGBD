import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header";
import AddData from "../../components/modals/addData";
import { App, BodyWrapper, BodyContent } from "../../style";
import Settings from "../../components/settings";
import ImportFile from "../../components/modals/importFile";
import ExportFile from "../../components/modals/exportData";
import { Title } from "../../components/modals/style";
import Table from "../../components/table";
const uuid = require("uuid");

const DataTable = () => {
  let { dbName, tableName } = useParams();
  const [table, setTable] = useState({});
  const [loadTableDone, setLoadTableDone] = useState(false);
  const [data, setData] = useState([]);
  const [loadDataDone, setLoadDataDone] = useState(false);
  const [keys, setKeys] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditActive, setIsEditActive] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [newData, setNewData] = useState({});
  const navigate = useNavigate();

  const confirmEdit = () => {
    window.DB.editData(
      `${window.path.getPath()}\\data.json`,
      data,
      dbName,
      tableName
    );
  };

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
        _id: uuid.v4(),
        ...newData,
      },
      dbName,
      tableName
    );
    setNewData({});
  };

  const deleteData = (id) => {
    window.DB.deleteData(
      setData,
      `${window.path.getPath()}\\data.json`,
      id,
      dbName,
      tableName
    );
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
      {isCreateModalOpen && (
        <AddData
          setCreateWindowOpen={setIsCreateModalOpen}
          addData={addData}
          keys={keys}
          setNewData={createNewData}
        />
      )}
      {isImportModalOpen && (
        <ImportFile
          setWindowOpen={setIsImportModalOpen}
          dbName={dbName}
          tableName={tableName}
          setData={setData}
        />
      )}
      {isExportModalOpen && (
        <ExportFile dataToExport={data} setWindowOpen={setIsExportModalOpen} />
      )}
      <Header db={table.dbName} table={tableName} />
      <BodyWrapper>
        <BodyContent>
          <Table
            data={data}
            keys={keys}
            setData={setData}
            isEditMode={isEditActive}
            deleteData={deleteData}
          />
        </BodyContent>
        <Settings
          isCreateEnable={true}
          setCreateWindowOpen={setIsCreateModalOpen}
          isEditEnable={true}
          setEditActive={setIsEditActive}
          isEditActive={isEditActive}
          setImportFileOpen={setIsImportModalOpen}
          setExportFileOpen={setIsExportModalOpen}
          isDataScreen={true}
          confirmEdit={confirmEdit}
        />
      </BodyWrapper>
    </App>
  );
};

export default DataTable;
