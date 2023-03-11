import "./createDB.css";

const CreateDB = ({ setNewDBName, setCreateWindowOpen, createDB }) => {
  return (
    <div className="Create-modal-wrapper">
      <div className="Create-modal">
        <h3>Create a new database</h3>
        <div>
          <div>
            <label>Name</label>
            <input
              type="text"
              onChange={(event) => setNewDBName(event.target.value)}
            />
          </div>
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
              createDB();
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

export default CreateDB;
