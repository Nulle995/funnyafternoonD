import { APIToken } from "../api";
import { useEffect, useState } from "react";
import ListEstudiante from "../components/ListEstudiante";
import Header from "../components/Header";

const Estudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterBy, setFilterBy] = useState("nombre_completo");
  const [visibleIndex, setVisibleIndex] = useState(null);

  const handleClick = (index) => {
    setVisibleIndex(visibleIndex == index ? null : index);
  };

  useEffect(() => {
    const getEstudiantes = async () => {
      try {
        const res = await APIToken.get("estudiantes/");
        const data = res.data;
        setEstudiantes(data);
        setFiltered(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getEstudiantes();
  }, []);
  return (
    <div className="apoderados-body">
      <Header
        title={"Estudiantes"}
        placeHolder={"Busca por nombre..."}
        list={filtered}
        setList={setFiltered}
        originalList={estudiantes}
        filterBy={filterBy}
      />
      <section>
        <ul className="lista-apoderados">
          {filtered &&
            filtered.map((est) => {
              return (
                <ListEstudiante
                  key={est.pk}
                  estudiante={est}
                  onClick={() => handleClick(est.pk)}
                  isVisible={est.pk == visibleIndex}
                />
              );
            })}
        </ul>
      </section>
    </div>
  );
};

export default Estudiantes;
