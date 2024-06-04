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

const Nav = ({ children }) => {
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
      <nav>
        <header>
          <h1>FunnyAfternoon</h1>
        </header>
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
