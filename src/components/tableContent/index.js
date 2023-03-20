import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { TableRow } from "../../style";
import { TableData } from "../table/style";
import { DataWrapper, TableDeleteButton } from "./style";

const TableContent = ({
  data,
  keys,
  isEditMode,
  setData,
  deleteData,
  isSearching,
}) => {
  const editData = (text, index, key) => {
    data[index][key] = text;
    setData([...data]);
  };

  return (
    <tbody>
      {data.length > 0 ? (
        data.map((d, index) => {
          return (
            <TableRow key={index}>
              <TableData>
                <DataWrapper>
                  <p>{d._id}</p>
                  {isEditMode && (
                    <TableDeleteButton
                      onClick={() => {
                        deleteData(d._id);
                      }}
                    >
                      <AiOutlineDelete />
                    </TableDeleteButton>
                  )}
                </DataWrapper>
              </TableData>
              {keys.map((k, i) => {
                if (k === "_id") {
                  return "";
                }
                return (
                  <TableData key={i}>
                    {isEditMode && k !== "id" ? (
                      <input
                        type="text"
                        onChange={(event) => {
                          editData(event.target.value, index, k);
                        }}
                        value={
                          d[k] &&
                          (typeof d[k] === "boolean"
                            ? d[k]
                              ? "true"
                              : "false"
                            : d[k])
                        }
                      />
                    ) : (
                      <DataWrapper>
                        <p>
                          {d[k] ? (
                            typeof d[k] === "boolean" ? (
                              d[k] ? (
                                "true"
                              ) : (
                                "false"
                              )
                            ) : (
                              d[k]
                            )
                          ) : (
                            <i>null</i>
                          )}
                        </p>
                      </DataWrapper>
                    )}
                  </TableData>
                );
              })}
            </TableRow>
          );
        })
      ) : (
        <TableRow>
          <TableData colSpan={keys.length}>
            <p style={{ textAlign: "center" }}>Aucun résultat</p>
          </TableData>
        </TableRow>
      )}
    </tbody>
  );
};

export default TableContent;
