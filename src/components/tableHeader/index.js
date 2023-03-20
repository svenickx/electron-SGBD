import React, { useEffect, useState } from "react";
import { TableRow } from "../../style";
import { HeaderContent, Resizeable, SortButton, TableHead } from "./style";
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";

const TableHeader = ({ setData, data, keys, searchInput, setSearchInput }) => {
  const [orderedKey, setOrderedKey] = useState("");

  const orderData = (key) => {
    const sortedData = [...data];
    if (key === orderedKey) {
      sortedData.sort((a, b) =>
        a[key] < b[key] ? 1 : a[key] === b[key] ? (a._id > b._id ? 1 : -1) : -1
      );
      setOrderedKey("");
    } else {
      sortedData.sort((a, b) =>
        a[key] > b[key] ? 1 : a[key] === b[key] ? (a._id > b._id ? 1 : -1) : -1
      );
      setOrderedKey(key);
    }
    setData(sortedData);
  };

  return (
    <thead>
      <TableRow>
        <TableHead>
          <HeaderContent>
            <Resizeable>_id</Resizeable>
            <SortButton onClick={() => orderData("_id")}>
              {"_id" === orderedKey ? (
                <FaSortAmountUpAlt />
              ) : (
                <FaSortAmountDownAlt />
              )}
            </SortButton>
          </HeaderContent>
          <div>
            <input
              type="text"
              onChange={(event) =>
                setSearchInput({ ...searchInput, _id: event.target.value })
              }
            />
          </div>
        </TableHead>
        {keys.map((k, i) => {
          if (k === "_id") {
            return "";
          }
          return (
            <TableHead key={i}>
              <HeaderContent>
                <Resizeable>{k}</Resizeable>
                <SortButton onClick={() => orderData(k)}>
                  {k === orderedKey ? (
                    <FaSortAmountUpAlt />
                  ) : (
                    <FaSortAmountDownAlt />
                  )}
                </SortButton>
              </HeaderContent>
              <div>
                <input
                  type="text"
                  onChange={(event) =>
                    setSearchInput({ ...searchInput, [k]: event.target.value })
                  }
                />
              </div>
            </TableHead>
          );
        })}
      </TableRow>
    </thead>
  );
};

export default TableHeader;
