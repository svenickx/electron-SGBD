import { useState } from "react";
import DialogButton from "../../dialogButton";
import {
  Actions,
  Cancel,
  Confirm,
  CreateModal,
  ModalWrapper,
  Title,
} from "../style";

const ImportFile = ({ setData, setWindowOpen, dbName, tableName }) => {
  const openDialog = () => {
    window.importFile.import(
      `${window.path.getPath()}\\data.json`,
      dbName,
      tableName,
      setData
    );
    setWindowOpen(false);
  };

  return (
    <ModalWrapper>
      <CreateModal>
        <Title>Import a JSON file</Title>

        <DialogButton onClick={openDialog} title="Select file" />
        <Actions>
          <Cancel onClick={() => setWindowOpen(false)}>Cancel</Cancel>
          <Confirm
            onClick={() => {
              setWindowOpen(false);
            }}
          >
            Confirm
          </Confirm>
        </Actions>
      </CreateModal>
    </ModalWrapper>
  );
};

export default ImportFile;
