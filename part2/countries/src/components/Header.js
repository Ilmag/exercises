const Header = (props) => {
  return (
    <div>
      find countries{" "}
      <input value={props.toFind} onChange={props.handleFindCountry} />
    </div>
  );
};

export default Header;
