import { useState } from "react";
import "./addData.css";

const AddData = ({ setCreateWindowOpen, addData, keys, setNewData }) => {
  const [newFieldName, setNewFieldName] = useState("");
  const [newFields, setNewFields] = useState([]);

  return (
    <div className="Create-modal-wrapper">
      <div className="Create-modal">
        <h3>Add data</h3>
        <div>
          <div>
            {keys.map((ele, i) => {
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
        <div className="Create-modal-actions">
          <button
            onClick={() => setCreateWindowOpen(false)}
            className="Create-modal-cancel"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              addData();
              setCreateWindowOpen(false);
            }}
            className="Create-modal-confirm"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddData;
