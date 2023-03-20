import { Link } from "react-router-dom";
import { AppHeader } from "./style";

const Header = ({ db, table }) => {
  return (
    <AppHeader>
      <Link to="/" className="header-link">
        Databases
      </Link>
      <span>&gt;</span>
      {db && (
        <>
          <Link to={`/tables/${db}`} className="header-link">
            {db}
          </Link>
          <span>&gt;</span>
          {table && (
            <>
              <Link to={`/dataTable/${db}/${table}`} className="header-link">
                {table}
              </Link>
              <span>&gt;</span>
            </>
          )}
        </>
      )}
    </AppHeader>
  );
};

export default Header;
