import { useState, useEffect } from "react";
import DialogButton from "../../components/dialogButton";
import { useNavigate } from "react-router-dom";
import { App } from "../../style";
import { HomeContainer } from "./style";

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
    if (path && path !== "" && path !== "undefined\\db.json") {
      setIsPathSet(true);
    }
  }, [path]);

  useEffect(() => {
    if (isPathSet) {
      navigate("/databases");
    }
  }, [isPathSet, navigate]);

  return (
    <App>
      <HomeContainer>
        <p>Please select the folder of the databases</p>
        <DialogButton onClick={openDialog} />
      </HomeContainer>
    </App>
  );
}

export default Home;
