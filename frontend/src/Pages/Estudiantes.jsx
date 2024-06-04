import { APIToken } from "../api";
import { useEffect, useState } from "react";

const Estudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]);

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
    <div>
      {estudiantes &&
        estudiantes.map((est) => {
          return <div>{est.primer_nombre}</div>;
        })}
    </div>
  );
};

export default Estudiantes;
