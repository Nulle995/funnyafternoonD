import { Link } from "react-router-dom";
import NavLink from "./NavLink";
import "../styles/Nav.css";
import { FaHome } from "react-icons/fa";
import { IoLogInSharp } from "react-icons/io5";
import { IoIosPerson } from "react-icons/io";
import { MdPerson3 } from "react-icons/md";
import { BsFillFilePersonFill } from "react-icons/bs";
import { BsPersonBadgeFill } from "react-icons/bs";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { PiStudentBold } from "react-icons/pi";
import { RiContactsBook3Fill } from "react-icons/ri";
import { IoMdSchool } from "react-icons/io";
import { IoCalendarSharp } from "react-icons/io5";
import { TbTimelineEventFilled } from "react-icons/tb";
import { IoIosTime } from "react-icons/io";
import { RxLapTimer } from "react-icons/rx";
import { BiSolidTime } from "react-icons/bi";
import { RiTimerFill } from "react-icons/ri";
import { BiSolidTimeFive } from "react-icons/bi";
import { FaCreditCard } from "react-icons/fa";
import { useContext } from "react";
import { NavContext } from "../contexts/NavContext";

const Nav = ({ children }) => {
  const { navIsActive, setNavIsActive } = useContext(NavContext);
  const links = [
    { to: "", icon: FaHome, text: "Home" },
    { to: "acceso", icon: IoLogInSharp, text: "Acceso" },
    { to: "apoderados", icon: BsFillPersonLinesFill, text: "Apoderados" },
    { to: "estudiantes", icon: IoMdSchool, text: "Estudiantes" },
    { to: "asistencia", icon: RiTimerFill, text: "Asistencia" },
    { to: "eventos", icon: IoCalendarSharp, text: "Eventos" },
    { to: "transacciones", icon: FaCreditCard, text: "Transacciones" },
  ];

  return (
    <main className="main-flex">
      <nav
        style={
          navIsActive
            ? {
                display: "block",
                width: "60%",
                backgroundColor: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(12px)",
              }
            : {}
        }
      >
        <header>
          {navIsActive ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="black"
              onClick={() => setNavIsActive(!navIsActive)}
            >
              <path
                d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
                fill="black"
              />
            </svg>
          ) : null}
          <h1>FunnyAfternoon</h1>
        </header>
        <hr />
        <ul className="ul-nav">
          {links.map((link) => {
            const { to, icon, text } = link;
            return <NavLink to={to} icon={icon} text={text} key={to} />;
          })}
        </ul>
      </nav>
      {children}
    </main>
  );
};

export default Nav;
