import { useState } from "react";
import {
  Actions,
  Cancel,
  Confirm,
  CreateModal,
  ModalWrapper,
  Title,
} from "../style";

const AddData = ({ setCreateWindowOpen, addData, keys, setNewData }) => {
  const [newFieldName, setNewFieldName] = useState("");
  const [newFields, setNewFields] = useState([]);

  return (
    <ModalWrapper>
      <CreateModal>
        <Title>Add data</Title>
        <div>
          <div>
            {keys.map((ele, i) => {
              if (ele === "_id") return "";
              return (
                <div key={i}>
                  <label htmlFor={ele}>{ele}</label>
                  <input
                    type="text"
                    onChange={(event) => setNewData(ele, event.target.value)}
                  />
                </div>
              );
            })}
            {newFields.map((ele, i) => {
              if (ele === "id") return "";
              return (
                <div key={i}>
                  <label htmlFor={ele}>{ele}</label>
                  <input
                    type="text"
                    onChange={(event) => setNewData(ele, event.target.value)}
                  />
                </div>
              );
            })}
          </div>
          <input
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
            Add a field
          </button>
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
