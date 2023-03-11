import { Link } from "react-router-dom";
import "./header.css";

const Header = ({ db, table }) => {
  return (
    <header className="App-header">
      <Link to="/">Databases</Link>
      <span>&gt;</span>
      {db && (
        <>
          <Link to={`/tables/${db}`}>{db}</Link>
          <span>&gt;</span>
          {table && (
            <>
              <Link to={`/dataTable/${db}/${table}`}>{table}</Link>
              <span>&gt;</span>
            </>
          )}
        </>
      )}
    </header>
  );
};

export default Header;
