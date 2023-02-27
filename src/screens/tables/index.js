import { useParams } from "react-router-dom";
import Header from "../../components/header";
import "./tables.css";

const Tables = () => {
  let { db } = useParams();

  return (
    <div className="App">
      <Header db={db} />
    </div>
  );
};

export default Tables;
