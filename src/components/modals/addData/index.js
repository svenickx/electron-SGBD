import { useState } from "react";
import {
  Actions,
  Cancel,
  Confirm,
  CreateModal,
  ModalWrapper,
  Title,
} from "../style";
import { DataInput, NewField } from "./style";

const AddData = ({ setCreateWindowOpen, addData, keys, setNewData }) => {
  const [newFieldName, setNewFieldName] = useState("");
  const [newFields, setNewFields] = useState([]);

  return (
    <ModalWrapper>
      <CreateModal>
        <Title>Add data</Title>
        <div style={{ position: "relative" }}>
          <div>
            {keys.map((ele, i) => {
              if (ele === "_id") return "";
              return (
                <DataInput key={i}>
                  <label htmlFor={ele}>{ele}</label>
                  <input
                    name={ele}
                    type="text"
                    onChange={(event) => setNewData(ele, event.target.value)}
                  />
                </DataInput>
              );
            })}
            {newFields.map((ele, i) => {
              if (ele === "id") return "";
              return (
                <DataInput key={i}>
                  <label htmlFor={ele}>{ele}</label>
                  <input
                    name={ele}
                    type="text"
                    onChange={(event) => setNewData(ele, event.target.value)}
                  />
                </DataInput>
              );
            })}
          </div>
          <NewField>
            <input
              name="confirm"
              type="text"
              value={newFieldName}
              onChange={(event) => setNewFieldName(event.target.value)}
            />
            <button
              className="Create-modal-button"
              onClick={() => {
                setNewFields([...newFields, newFieldName]);
                setNewFieldName("");
              }}
            >
              Add new field
            </button>
          </NewField>
        </div>
        <Actions>
          <Cancel onClick={() => setCreateWindowOpen(false)}>Cancel</Cancel>
          <Confirm
            onClick={() => {
              addData();
              setCreateWindowOpen(false);
            }}
          >
            Confirm
          </Confirm>
        </Actions>
      </CreateModal>
    </ModalWrapper>
  );
};

export default AddData;
