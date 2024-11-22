import { useContext } from "react";
import FilteredSearch from "../components/FilteredSearch";
import { NavContext } from "../contexts/NavContext";
import "../styles/Header.css";

const Header = ({
  title,
  placeHolder,
  list,
  setList,
  originalList = null,
  filterBy = null,
}) => {
  const { navIsActive, setNavIsActive } = useContext(NavContext);
  return (
    <header className="header">
      <div className="left">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.8rem"
          height="1.8rem"
          viewBox="0 0 24 24"
          fill="none"
          className="hamburger"
          onClick={() => setNavIsActive(!navIsActive)}
        >
          <path d="M5 6.5H19V8H5V6.5Z" fill="#fff" />
          <path d="M5 16.5H19V18H5V16.5Z" fill="#fff" />
          <path d="M5 11.5H19V13H5V11.5Z" fill="#fff" />
        </svg>
        <h1>{title}</h1>
      </div>
      <div className="apoderados-busqueda">
        <FilteredSearch
          list={list}
          originalList={originalList}
          filterBy={filterBy}
          placeHolder={placeHolder}
          setList={setList}
        />

        {/* <select
            name=""
            id=""
            defaultValue="nombre_completo"
            onChange={(e) => {
              setFilterBy(e.target.value);
              console.log(e.target.value);
            }}
          >
            <option value={"nombre_completo"}>Nombre completo</option>
            <option value={"rut"}>RUT</option>
          </select> */}
      </div>
    </header>
  );
};

export default Header;
