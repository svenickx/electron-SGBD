import { useState, useEffect } from "react";
import DialogButton from "../../components/dialogButton";
import "./home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [path, setPath] = useState("");
  const [isPathSet, setIsPathSet] = useState(false);

  const openDialog = () => {
    window.dialog.open();
    window.dialog.setFilePath(setPath);
  };

  useEffect(() => {
    if (window.path.getPath() !== "") {
      setPath(window.path.getPath());
    }
    if (path !== "" && path !== "undefined\\db.json") {
      setIsPathSet(true);
    }
  }, [path]);

  useEffect(() => {
    if (isPathSet) {
      navigate("/databases");
    }
  }, [isPathSet, navigate]);

  return (
    <div>
      <p>Please Select a folder of the database</p>
      <DialogButton onClick={openDialog} />
    </div>
  );
}

export default Home;
