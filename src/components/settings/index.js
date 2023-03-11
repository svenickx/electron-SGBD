import React from "react";
import { useNavigate } from "react-router-dom";

import {
  CreateButton,
  EditButton,
  LeaveButton,
  SettingsContainer,
} from "./style";

const Settings = ({
  isCreateEnable,
  isEditEnable,
  isLeaveEnable,
  setCreateWindowOpen,
}) => {
  const navigate = useNavigate();

  return (
    <SettingsContainer>
      {isCreateEnable && (
        <CreateButton onClick={() => setCreateWindowOpen(true)}>+</CreateButton>
      )}
      {isEditEnable && <EditButton onClick={() => {}}>Edit</EditButton>}
      {isLeaveEnable && (
        <LeaveButton
          onClick={() => {
            window.DB.closeDB();
            navigate("/");
          }}
        >
          Leave
        </LeaveButton>
      )}
    </SettingsContainer>
  );
};

export default Settings;
