import "./createDB.css";

const CreateDB = ({
  setNewDBName,
  newDbTables,
  setNewDbTables,
  setCreateWindowOpen,
  createDB,
}) => {
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
          <div className="Tables-container">
            <label>Tables</label>
            <div className="Create-tables">
              {newDbTables.map((_, index) => {
                return (
                  <div key={index}>
                    <input
                      placeholder={`New table ${index}`}
                      onChange={(event) =>
                        (newDbTables[index] = { name: event.target.value })
                      }
                    />
                    {newDbTables.length > 1 ? (
                      <button
                        onClick={() => {
                          let newTables = [...newDbTables];
                          newTables.splice(index, 1);
                          setNewDbTables(newTables);
                        }}
                      >
                        Delete
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </div>
            <button
              className="Create-modal-button"
              onClick={() => setNewDbTables([...newDbTables, {}])}
            >
              Add a field
            </button>
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
