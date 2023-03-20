import React, { useEffect, useState } from "react";
import { TableContainer, TableView } from "./style";
import TableHeader from "../tableHeader";
import TableContent from "../tableContent";

const Table = ({ data, keys, setData, isEditMode, deleteData }) => {
  const [searchInput, setSearchInput] = useState({});
  const [searchData, setSearchData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    let searchResults = data;
    for (const key in searchInput) {
      if (searchInput[key] === "") {
        delete searchInput[key];
        continue;
      }
      setIsSearching(true);
      searchResults = searchResults
        .filter((d) => d[key])
        .filter((d) =>
          d[key]
            .toString()
            .toLowerCase()
            .includes(searchInput[key].toLowerCase())
        );
    }
    setSearchData(searchResults);
  }, [searchInput]);

  return (
    <TableContainer>
      <TableView>
        <TableHeader
          data={data}
          setData={setData}
          keys={keys}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
        <TableContent
          data={isSearching ? searchData : data}
          isEditMode={isEditMode}
          keys={keys}
          setData={setData}
          deleteData={deleteData}
          isSearching={isSearching}
        />
      </TableView>
    </TableContainer>
  );
};

export default Table;
