import { Link } from "react-router-dom";
import "./header.css";

const Header = ({ db, table }) => {
  return (
    <header className="App-header">
      <Link to="/">Databases</Link>
      <span>&gt;</span>
      {db ? (
        <>
          <p>{db}</p>
          <span>&gt;</span>
          {table ? (
            <>
              <p>{table}</p>
              <span>&gt;</span>
            </>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </header>
  );
};

export default Header;
