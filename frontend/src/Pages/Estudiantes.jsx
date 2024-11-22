import { APIToken } from "../api";
import { useEffect, useState } from "react";
import ListEstudiante from "../components/ListEstudiante";
import Header from "../components/Header";

const Estudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]);
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
        list={[]}
        setList={[]}
        originalList={[]}
        filterBy={[]}
      />
      <section>
        <ul className="lista-apoderados">
          {estudiantes &&
            estudiantes.map((est) => {
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
