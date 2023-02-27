const Header = ({ db, table }) => {
  return (
    <header className="App-header">
      <p>Databases</p>
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
