import { Link } from "react-router-dom";
import "../styles/NavLink.css";
import { useContext } from "react";
import { NavContext } from "../contexts/NavContext";

const NavLink = ({ to, icon, text }) => {
  const { setNavIsActive } = useContext(NavContext);
  const Icon = icon;
  return (
    <li className="link-nav">
      <Link to={`/${to}`} onClick={() => setNavIsActive(false)}>
        <Icon />
        {text}
      </Link>
    </li>
  );
};

export default NavLink;
