import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineFolderOpen, AiOutlineEdit } from "react-icons/ai";
import { GrFormAdd } from "react-icons/gr";
import { TbFileExport, TbFileImport } from "react-icons/tb";
import { GiConfirmed, GiCancel } from "react-icons/gi";

import {
  CreateButton,
  EditButton,
  ExportButton,
  ImportButton,
  LeaveButton,
  SettingsContainer,
} from "./style";

const Settings = ({
  isCreateEnable,
  isEditEnable,
  isEditActive,
  isLeaveEnable,
  isDataScreen,
  setCreateWindowOpen,
  setEditActive,
  setImportFileOpen,
  setExportFileOpen,
  confirmEdit,
}) => {
  const navigate = useNavigate();

  return (
    <SettingsContainer>
      {isEditActive ? (
        <>
          <CreateButton
            title="Confirm Edit"
            onClick={() => {
              confirmEdit();
              setEditActive(false);
            }}
          >
            <GiConfirmed />
          </CreateButton>
          <LeaveButton title="Cancel Edit" onClick={() => setEditActive(false)}>
            <GiCancel />
          </LeaveButton>
        </>
      ) : (
        <>
          {isCreateEnable && (
            <CreateButton title="Add" onClick={() => setCreateWindowOpen(true)}>
              <GrFormAdd />
            </CreateButton>
          )}
          {isEditEnable && (
            <EditButton title="Edit" onClick={() => setEditActive(true)}>
              <AiOutlineEdit />
            </EditButton>
          )}
          {isLeaveEnable && (
            <LeaveButton
              title="Close this folder"
              onClick={() => {
                window.DB.closeDB();
                navigate("/");
              }}
            >
              <AiOutlineFolderOpen />
            </LeaveButton>
          )}
          {isDataScreen && (
            <>
              <ImportButton
                title="Import file"
                onClick={() => setImportFileOpen(true)}
              >
                <TbFileImport />
              </ImportButton>
              <ExportButton
                title="Export"
                onClick={() => setExportFileOpen(true)}
              >
                <TbFileExport />
              </ExportButton>
            </>
          )}
        </>
      )}
    </SettingsContainer>
  );
};

export default Settings;
