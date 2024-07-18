import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { APIToken } from "../api";
import Header from "../components/Header.jsx";
import "../styles/Asistencia.css";
const Asistencia = () => {
  const [estudiantes, setEstudiantes] = useState(null);
  const [presentes, setPresentes] = useState([]);
  const [disponibles, setDisponibles] = useState([]);
  const [reload, setReload] = useState(false);

  const now = new Date();
  const year = now.getFullYear();
  const month = new String(now.getMonth() + 1).padStart(2, 0);
  const day = new String(now.getDate()).padStart(2, 0);
  const fullDate = `${year}-${month}-${day}`;
  console.log(fullDate);

  const handleClick = async (id) => {
    try {
      const res = await APIToken.post(`asistencia/`, {
        estudiante: id,
        fecha: fullDate,
      });
      const data = res.data;
      setReload(!reload);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAsistencia = async (id) => {
    toast.info("Eliminando asistencia...");
    try {
      const res = await APIToken.delete(`asistencia/${id}/delete/`);
      const data = res.data;
      console.log(data);
      toast.success("Asistencia eliminada!");
      setReload(!reload);
    } catch (error) {
      toast.error("nos e pudo");
    }
  };

  useEffect(() => {
    const getAsistencia = async () => {
      const res = await APIToken.get("estudiantes/");
      const data = res.data;
      console.log(data);
      const estudiantesActivos = data.filter(
        (est) =>
          est.inscripciones &&
          est.inscripciones.length > 0 &&
          est.inscripciones.some((inscripcion) => inscripcion.activa === true)
      );
      const estudiantesPresentes = [];
      const estudiantesDisponibles = [];
      estudiantesActivos.forEach((est) => {
        const inscripcionActiva = est.inscripciones.find(
          (inscripcion) => inscripcion.activa === true
        );
        console.log(inscripcionActiva.asistencias);
        if (
          inscripcionActiva &&
          inscripcionActiva.asistencias.some(
            (asistencia) => asistencia.fecha == fullDate
          )
        ) {
          console.log("presente");
          estudiantesPresentes.push(est);
        } else {
          estudiantesDisponibles.push(est);
          console.log("disponible");
        }
      });
      setEstudiantes(estudiantes);
      setPresentes(estudiantesPresentes);
      setDisponibles(estudiantesDisponibles);
      console.log(estudiantesDisponibles);
      console.log(estudiantesPresentes);
    };
    getAsistencia();
  }, [reload]);
  return (
    <div>
      <Header title="Asistencia" placeHolder="busca" list={[]} setList={[]} />

      <section className="asistencia">
        <div>
          <h2>Presentes</h2>
          {presentes.map((est) => {
            const inscripcion = est.inscripciones.find((inscripcion) =>
              inscripcion.activa === true ? inscripcion : null
            );
            const ultAsistencia = inscripcion
              ? inscripcion.asistencias.find((asistencia) =>
                  asistencia.fecha === fullDate ? asistencia : null
                )
              : [];
            const asistenciaId = ultAsistencia ? ultAsistencia.pk : null;
            console.log(asistenciaId);
            return (
              <div>
                {est.nombre_completo}{" "}
                <button onClick={() => handleAsistencia(asistenciaId)}>
                  -
                </button>
              </div>
            );
          })}
        </div>
        <Toaster richColors />
        <div>
          <h1>Asistencia</h1>
          {disponibles.map((est) => (
            <div>
              {est.nombre_completo}{" "}
              <button onClick={() => handleClick(est.pk)}>+</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Asistencia;
