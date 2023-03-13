import React from "react";

const DialogButton = ({ onClick, title }) => {
  return <button onClick={onClick}>{title}</button>;
};

export default DialogButton;
