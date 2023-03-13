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

const ExportFile = ({ dataToExport, setWindowOpen }) => {
  const [fileName, setFileName] = useState("");
  const [folderPath, setFolderPath] = useState("");

  const openDialog = () => {
    window.dialog.open();
    window.dialog.setFilePath(setFolderPath, false);
  };

  const exportFile = () => {
    if (fileName !== "" && folderPath !== "") {
      window.exportFile.export(`${folderPath}\\${fileName}.json`, dataToExport);
    }
  };

  return (
    <ModalWrapper>
      <CreateModal>
        <Title>Export as JSON File</Title>
        <input
          type="text"
          placeholder="fileName"
          onChange={(event) => {
            setFileName(event.target.value);
          }}
        />
        <DialogButton onClick={openDialog} title="Select folder" />
        {folderPath && (
          <p>
            {folderPath}\{fileName}.json
          </p>
        )}
        <Actions>
          <Cancel onClick={() => setWindowOpen(false)}>Cancel</Cancel>
          <Confirm
            onClick={() => {
              exportFile();
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

export default ExportFile;
