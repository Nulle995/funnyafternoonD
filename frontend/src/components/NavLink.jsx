import { Link } from "react-router-dom";
import "../styles/NavLink.css";

const NavLink = ({ to, icon, text }) => {
  const Icon = icon;
  return (
    <li className="link-nav">
      <Link to={`/${to}`}>
        <Icon />
        {text}
      </Link>
    </li>
  );
};

export default NavLink;
