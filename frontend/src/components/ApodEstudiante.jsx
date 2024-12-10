import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import "../styles/Apoderados.css";
import { APIToken, API } from "../api";
import Dialog from "../components/Dialog";
const ApodEstudiante = ({ estudiante, setInscripciones }) => {
  {
    const [inscripcionActiva, setInscripcionActiva] = useState(
      estudiante.inscripciones.filter(
        (inscripcion) => inscripcion.activa === true
      )
    );
    const dialogPlanRef = useRef(null);

    const togglePlanDialog = (e) => {
      if (!dialogPlanRef.current) return;

      dialogPlanRef.current.hasAttribute("open")
        ? dialogPlanRef.current.close()
        : dialogPlanRef.current.showModal();
    };
    const formRef = useRef(null);
    const handlePlanSubmit = async (e) => {
      e.preventDefault();
      console.log("nueva inscripcion");
      const formData = new FormData(formRef.current);
      formData.append("estudiante", estudiante.pk);
      console.log(Object.fromEntries(formData.entries()));
      const objectFormData = Object.fromEntries(formData.entries());
      if (objectFormData.fecha_fin === "") {
        objectFormData.fecha_fin = null;
      }
      console.log(objectFormData);
      try {
        const res = await APIToken.post("inscripciones/", objectFormData);
        const data = res.data;
        console.log(data);
        // inscripcionActiva = data;
        setInscripcionActiva([data]);
        setInscripciones((prev) => [data, ...prev]);
      } catch (e) {
        console.log(e);
      }
    };
    return (
      <li key={estudiante.pk} className="apoderado-item-estudiante">
        <img
          src="https://media1.popsugar-assets.com/files/thumbor/EQTi01DEi2lr324_T2rA3sm39ic/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2020/08/14/624/n/24155406/9edeafc27d7a50ee_70701382_183100509518051_7114000417055715454_n/i/Am-I-Doing-It.jpg"
          alt=""
        />
        <div className="estudiante-info">
          <p className="nombre-completo">{estudiante.nombre_completo}</p>
          {inscripcionActiva.length > 0 ? (
            inscripcionActiva.map((inscripcion) => {
              return (
                <div key={inscripcion.pk} className="plan-detalle">
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
              <button onClick={togglePlanDialog}>Agregar plan</button>
              <Dialog ref={dialogPlanRef} toggleDialog={togglePlanDialog}>
                <p>Estudiante: </p>
                <p>{estudiante.nombre_completo}</p>
                <p>Nueva Inscripción</p>
                <form
                  onSubmit={handlePlanSubmit}
                  ref={formRef}
                  style={{
                    display: "grid",
                    justifyItems: "left",
                  }}
                >
                  <label htmlFor="plan">
                    Plan<span>*</span>
                  </label>
                  <select id="plan" name="plan" required>
                    <option value={2}>Diario</option>
                    <option value={1}>Semanal</option>
                    <option value={3}>Mensual</option>
                  </select>
                  <label htmlFor="fecha_inicio">
                    Fecha Inicio <span>*</span>
                  </label>
                  <input
                    type="date"
                    id="fecha_inicio"
                    name="fecha_inicio"
                    required
                  />
                  <label htmlFor="fecha_fin">Fecha Fin</label>
                  <input type="date" id="fecha_fin" name="fecha_fin" />
                  <label htmlFor="pagado">Pagado</label>
                  <input type="checkbox" id="pagado" name="pagado" />

                  <div style={{ display: "flex", gap: "1rem" }}>
                    <button type="submit">Agregar Estudiante</button>
                    <button type="button" onClick={togglePlanDialog}>
                      Cancelar
                    </button>
                  </div>
                </form>
              </Dialog>
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
  }
};

export default ApodEstudiante;
