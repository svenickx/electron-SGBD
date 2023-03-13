import {
  Actions,
  Body,
  Cancel,
  Confirm,
  CreateModal,
  ModalWrapper,
  Title,
} from "../style";

const CreateTable = ({ setData, addData, setCreateWindowOpen }) => {
  return (
    <ModalWrapper>
      <CreateModal>
        <Title>Add a table</Title>
        <div>
          <Body>
            <label>Name</label>
            <input
              type="text"
              onChange={(event) => {
                setData(event.target.value);
              }}
            />
          </Body>
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

export default CreateTable;
