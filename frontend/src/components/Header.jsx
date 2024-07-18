import FilteredSearch from "../components/FilteredSearch";

const Header = ({
  title,
  placeHolder,
  list,
  setList,
  originalList = null,
  filterBy = null,
}) => {
  return (
    <header>
      <h1>{title}</h1>
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
