import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { IoMdSchool } from "react-icons/io";
import Dialog from "./Dialog";
import { APIToken } from "../api";
import { Toaster, toast } from "sonner";

const ListApoderado = ({ apoderado, isVisible, onClick }) => {
  const {
    nombre_completo,
    rut,
    email,
    fecha_nacimiento,
    telefono,
    estudiantes,
  } = apoderado;
  const [est, setEst] = useState(estudiantes);
  const [inscripciones, setInscripciones] = useState([]);

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      const res = await APIToken.post("estudiantes/", formData);
      const data = res.data;
      setEst((prev) => [data, ...prev]);
      toggleDialog();
      toast.success("Se añadió el nuevo Estudiante");
    } catch (e) {
      console.log(e.response.data.rut);
      toast.error("Hubo un error al añadir Estudiante!");
    }
  };

  const [formData, setFormData] = useState({
    primer_nombre: "",
    segundo_nombre: "",
    tercer_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    rut: "",
    fecha_nacimiento: "",
    apoderado: apoderado.pk,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    console.log(formData);
  };

  const dialogRef = useRef(null);

  const toggleDialog = (e) => {
    if (!dialogRef.current) return;

    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  };

  useEffect(() => {
    let nuevasInscripciones = [];
    apoderado.estudiantes.map((est) =>
      est?.inscripciones.map((inscripcion) =>
        nuevasInscripciones.push(inscripcion)
      )
    );
    nuevasInscripciones.sort((a, b) => {
      if (a.fecha_inicio > b.fecha_inicio) {
        return -1;
      } else if (a.fecha_inicio < b.fecha_inicio) {
        return 1;
      } else {
        return 0;
      }
    });
    // console.log(nuevasInscripciones);
    setInscripciones(nuevasInscripciones.slice(0, 5));
  }, []);

  return (
    <li className="apoderado-item">
      <div className="apoderado" onClick={onClick}>
        {apoderado && (
          <div className="apoderado-header">
            <div className="apoderado-foto">
              <img
                src="https://media1.popsugar-assets.com/files/thumbor/EQTi01DEi2lr324_T2rA3sm39ic/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2020/08/14/624/n/24155406/9edeafc27d7a50ee_70701382_183100509518051_7114000417055715454_n/i/Am-I-Doing-It.jpg"
                alt=""
              />
            </div>
            <div>
              <p className="nombre">{nombre_completo}</p>

              <div className="datos">
                <p className="secundario">{rut}</p>
                <p className="secundario">{telefono}</p>
                <p className="secundario">{email}</p>
              </div>
            </div>
          </div>
        )}
        <span>{isVisible ? "🔼" : "🔽"}</span>
      </div>

      <div
        className={`apoderado-detalle ${isVisible ? "visible" : "no-visible"}`}
      >
        <Toaster richColors />
        <div className="detalle-flex">
          <div className="apoderado-list-estudiante">
            <div className="flex">
              <h1>Inscritos</h1>
              <div className="nuevo-estudiante">
                <button onClick={toggleDialog} id="nuevo-estudiante">
                  Agregar Estudiante
                </button>
                <Dialog ref={dialogRef} toggleDialog={toggleDialog}>
                  <p>{apoderado.nombre_completo}</p>
                  <p>Nuevo estudiante</p>
                  <form onSubmit={(e) => handleSubmit(e)} id="form">
                    <label htmlFor="primer_nombre">
                      Primer Nombre<span>*</span>
                    </label>
                    <input
                      type="text"
                      id="primer_nombre"
                      value={formData.primer_nombre}
                      onChange={handleChange}
                      required
                      placeholder="Damián, Pedro, Pablo..."
                    />
                    <label htmlFor="segundo_nombre">
                      Segundo Nombre<span>*</span>
                    </label>
                    <input
                      type="text"
                      id="segundo_nombre"
                      value={formData.segundo_nombre}
                      onChange={handleChange}
                      required
                      placeholder="Damián, Pedro, Pablo..."
                    />
                    <label htmlFor="tercer_nombre">Tercer Nombre</label>
                    <input
                      type="text"
                      id="tercer_nombre"
                      value={formData.tercer_nombre}
                      onChange={handleChange}
                      placeholder="Damián, Pedro, Pablo..."
                    />
                    <label htmlFor="primer_apellido">
                      Primer Apellido<span>*</span>
                    </label>
                    <input
                      type="text"
                      id="primer_apellido"
                      value={formData.primer_apellido}
                      onChange={handleChange}
                      required
                      placeholder="Piña, Avendaño, Ampuero..."
                    />
                    <label htmlFor="segundo_apellido">
                      Segundo Apellido<span>*</span>
                    </label>
                    <input
                      type="text"
                      id="segundo_apellido"
                      value={formData.segundo_apellido}
                      onChange={handleChange}
                      required
                      placeholder="Piña, Avendaño, Ampuero..."
                    />
                    <label htmlFor="rut">
                      RUT<span>*</span>
                    </label>
                    <input
                      type="text"
                      id="rut"
                      value={formData.rut}
                      onChange={handleChange}
                      required
                      placeholder="19235467-k"
                    />
                    <label htmlFor="fecha_nacimiento">
                      Fecha de Nacimiento<span>*</span>
                    </label>
                    <input
                      type="date"
                      id="fecha_nacimiento"
                      value={formData.fecha_nacimiento}
                      onChange={handleChange}
                      required
                    />
                    <button type="submit">Agregar Estudiante</button>
                  </form>
                </Dialog>
                {/* <Link to={`/apoderados/${apoderado.pk}/estudiantes/crear/`}>
                  Agregar Estudiante
                </Link> */}
              </div>
            </div>
            <div>
              {est.length >= 1 ? (
                est.map((estudiante) => {
                  const inscripcionActiva = estudiante.inscripciones.filter(
                    (inscripcion) => inscripcion.activa === true
                  );
                  return (
                    <li
                      key={estudiante.pk}
                      className="apoderado-item-estudiante"
                    >
                      <img
                        src="https://media1.popsugar-assets.com/files/thumbor/EQTi01DEi2lr324_T2rA3sm39ic/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2020/08/14/624/n/24155406/9edeafc27d7a50ee_70701382_183100509518051_7114000417055715454_n/i/Am-I-Doing-It.jpg"
                        alt=""
                      />
                      <div className="estudiante-info">
                        <p className="nombre-completo">
                          {estudiante.nombre_completo}
                        </p>
                        {inscripcionActiva.length > 0 ? (
                          inscripcionActiva.map((inscripcion) => {
                            return (
                              <div
                                key={inscripcion.pk}
                                className="plan-detalle"
                              >
                                <p>{inscripcion.plan_detalle.descripcion}</p>
                                <p>
                                  {inscripcion.plan_detalle.duracion_dias -
                                    inscripcion.dias_asistidos}{" "}
                                  Días restantes
                                </p>
                              </div>
                            );
                          })
                        ) : (
                          <div className="plan-detalle">
                            <p>No hay planes activos</p>
                            <button>Agregar plan</button>
                          </div>
                        )}
                        {/* <div>
                      <Link to={`/estudiantes/${estudiante.pk}`}>
                        <button>Ver</button>
                      </Link>
                      <Link>
                        <button>Asistencia</button>
                      </Link>
                    </div> */}
                      </div>
                    </li>
                  );
                })
              ) : (
                <li>No hay estudiantes para {nombre_completo}!</li>
              )}
            </div>
          </div>
          <div className="detalle-data">
            <h1>Inscripciones</h1>
            <div className="inscripciones">
              <table>
                <thead>
                  <th>Tipo</th>
                  <th>Inicio</th>
                  <th>Fin</th>
                  <th>Estado</th>
                </thead>
                <tbody className="inscripciones-table">
                  {inscripciones.length > 1 ? (
                    inscripciones.map((inscripcion) => {
                      return (
                        <tr className="inscripcion">
                          <td>{inscripcion.plan_detalle.descripcion}</td>
                          <td>{inscripcion.fecha_inicio}</td>
                          <td>
                            {inscripcion.fecha_fin
                              ? inscripcion.fecha_fin
                              : "--"}
                          </td>
                          {inscripcion.activa ? (
                            <td className="activa"></td>
                          ) : (
                            <td className="inactiva"></td>
                          )}
                        </tr>
                      );
                    })
                  ) : (
                    <div>No hay inscripciones...</div>
                  )}
                </tbody>
              </table>
            </div>
            {/* <div className="estudiantes">
              <IoMdSchool className="icon" />
              <p>{estudiantes.length}</p>
              <p>{estudiantes.length > 1 ? "Estudiantes" : "Estudiante"}</p>
            </div> */}
          </div>
        </div>
      </div>
    </li>
  );
};

export default ListApoderado;
