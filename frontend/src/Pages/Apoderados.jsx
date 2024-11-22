import { useState, useEffect, useContext } from "react";
import "../styles/Apoderados.css";
import { APIToken, API } from "../api";
import ListApoderado from "../components/ListApoderado";
import { UserContext } from "../contexts/UserContext";
import FilteredSearch from "../components/FilteredSearch";
import Header from "../components/Header";

const Apoderados = () => {
  const [apoderados, setApoderados] = useState(null);
  const [filtered, setFiltered] = useState(null);
  const [filterBy, setFilterBy] = useState("nombre_completo");
  const [visibleIndex, setVisibleIndex] = useState(null);
  const { reload, setReload } = useContext(UserContext);

  const handleClick = (index) => {
    setVisibleIndex(index == visibleIndex ? null : index);
  };

  useEffect(() => {
    const getToken = async () => await setReload(!reload);
    const getApoderados = async () => {
      try {
        const res = await APIToken.get("apoderados/");
        const data = res.data;
        const list = data.sort((a, b) => {
          const nameA = a.nombre_completo.toLowerCase();
          const nameB = b.nombre_completo.toLowerCase();
          if (nameA > nameB) {
            return 1;
          } else if (nameA < nameB) {
            return -1;
          } else {
            return 0;
          }
        });
        console.log(list);
        setApoderados(list);
        setFiltered(list);
      } catch (error) {
        console.log(error);
      }
    };
    getToken();
    getApoderados();
  }, []);

  return (
    <div className="apoderados-body">
      <Header
        title={"Apoderados"}
        placeHolder={"Busca por nombre o rut..."}
        list={filtered}
        setList={setFiltered}
        originalList={apoderados}
        filterBy={filterBy}
      />
      <button className="btn-agregar">Nuevo Apoderado</button>
      {/* <header>
        <h1>Apoderados</h1>
        <div className="apoderados-busqueda">
          <FilteredSearch
            list={filtered}
            setList={setFiltered}
            originalList={apoderados}
            filterBy={filterBy}
            placeHolder="Busca por nombre o rut..."
          />

         
        </div>
      </header> */}

      <section>
        <ul className="lista-apoderados">
          {filtered &&
            filtered.map((apoderado) => {
              return (
                <ListApoderado
                  key={apoderado.pk}
                  apoderado={apoderado}
                  onClick={() => handleClick(apoderado.pk)}
                  isVisible={visibleIndex == apoderado.pk}
                />
              );
            })}
        </ul>
      </section>
    </div>
  );
};

export default Apoderados;
