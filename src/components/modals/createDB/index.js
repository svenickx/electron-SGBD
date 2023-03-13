import {
  Actions,
  Body,
  Cancel,
  Confirm,
  CreateModal,
  ModalWrapper,
  Title,
} from "../style";

const CreateDB = ({ setNewDBName, setCreateWindowOpen, createDB }) => {
  return (
    <ModalWrapper>
      <CreateModal>
        <Title>Create a new database</Title>
        <div>
          <Body>
            <label>Name</label>
            <input
              type="text"
              onChange={(event) => setNewDBName(event.target.value)}
            />
          </Body>
        </div>
        <Actions>
          <Cancel onClick={() => setCreateWindowOpen(false)}>Cancel</Cancel>
          <Confirm
            onClick={() => {
              createDB();
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

export default CreateDB;
