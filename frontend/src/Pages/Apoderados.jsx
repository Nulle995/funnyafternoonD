import { useState, useEffect, useContext, useRef } from "react";
import { APIToken, API } from "../api";
import ListApoderado from "../components/ListApoderado";
import { UserContext } from "../contexts/UserContext";
import FilteredSearch from "../components/FilteredSearch";
import Header from "../components/Header";
import Dialog from "../components/Dialog";
import "../styles/Apoderados.css";
import "../styles/Dialog.css";

const Apoderados = () => {
  const [apoderados, setApoderados] = useState(null);
  const [filtered, setFiltered] = useState(null);
  const [filterBy, setFilterBy] = useState("nombre_completo");
  const [visibleIndex, setVisibleIndex] = useState(null);
  const { reload, setReload } = useContext(UserContext);
  const dialogRef = useRef(null);
  const handleClick = (index) => {
    setVisibleIndex(index == visibleIndex ? null : index);
  };

  const toggleDialog = () => {
    if (!dialogRef.current) return;
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
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
      <button className="btn-agregar" onClick={toggleDialog}>
        Nuevo Apoderado
      </button>
      <Dialog ref={dialogRef} toggleDialog={toggleDialog}>
        <form action="">
          <label htmlFor="primer_nombre">Primer Nombre*</label>
          <input
            type="text"
            id="primer_nombre"
            placeholder="Damián, Pablo..."
          />
          <label htmlFor="segundo_nombre">Segundo Nombre*</label>
          <input
            type="text"
            id="segundo_nombre"
            placeholder="Damián, Pablo..."
          />
          <label htmlFor="tercer_nombre">Tercer Nombre</label>
          <input
            type="text"
            id="tercer_nombre"
            placeholder="Damián, Pablo..."
          />
          <label htmlFor="primer_apellido">Primer Apellido*</label>
          <input
            type="text"
            id="primer_apellido"
            placeholder="Navarro, Vásquez..."
          />
          <label htmlFor="segundo_apellido">Segundo Apellido*</label>
          <input
            type="text"
            id="segundo_apellido"
            placeholder="Navarro, Vásquez..."
          />
          <label htmlFor="email">Email*</label>
          <input type="text" id="email" placeholder="d.navarro@gmail.com" />
          <label htmlFor="tel">Teléfono*</label>
          <input type="text" id="tel" placeholder="+56912345678" />
          <label htmlFor="rut">RUT*</label>
          <input type="text" id="rut" placeholder="19.254.351-7" />
          <label htmlFor="fecha_nacimiento">Fecha de Nacimiento*</label>
          <input type="date" id="fecha_nacimiento" />
          <div>
            <button type="submit">Aceptar</button>
            <button type="button">Cancelar</button>
          </div>
        </form>
      </Dialog>
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
