import React from "react";
import { TableContainer, TableView } from "./style";
import TableHeader from "../tableHeader";
import TableContent from "../tableContent";

const Table = ({ data, keys, setData, isEditMode, deleteData }) => {
  return (
    <TableContainer>
      <TableView>
        <TableHeader data={data} setData={setData} keys={keys} />
        <TableContent
          data={data}
          isEditMode={isEditMode}
          keys={keys}
          setData={setData}
          deleteData={deleteData}
        />
      </TableView>
    </TableContainer>
  );
};

export default Table;
