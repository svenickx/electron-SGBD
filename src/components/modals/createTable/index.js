import "./createTable.css";

const CreateTable = ({ setData, addData, setCreateWindowOpen }) => {
  return (
    <div className="Create-modal-wrapper">
      <div className="Create-modal">
        <h3>Add a table</h3>
        <div>
          <div></div>
          <label>Name</label>
          <input
            type="text"
            onChange={(event) => {
              setData(event.target.value);
            }}
          />
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

export default CreateTable;
