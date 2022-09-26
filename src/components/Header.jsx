import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title, onAdd, showAdd }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button color={showAdd ? "Blue" : "orange"} text={showAdd ? "close" : "Add"} onClick={onAdd} />
    </header>
  );
};

Header.defaultProps = {
  title: "To Do List",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
