import { useRef, useState } from "react";
import Dialog from "./Dialog";
import { APIToken } from "../api";

const ListEstudiante = ({ estudiante, onClick, isVisible }) => {
  const {
    nombre_completo,
    rut,
    apoderado_detalle,
    inscripciones,
    pk,
    apoderado,
  } = estudiante;

  const [formData, setFormData] = useState({
    plan: 2,
    fecha_inicio: "",
    fecha_fin: null,
    pagado: false,
    estudiante: pk,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(e.target);
    setFormData({ ...formData, [id]: value });
    console.log(formData);
  };

  const dialogRef = useRef(null);
  const toggleDialog = () => {
    if (!dialogRef.current) return;

    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await APIToken.post("inscripciones/", formData);
      const data = res.data;
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleClick = (pk) => {
    try {
      const res = APIToken.patch(`inscripciones/${pk}/update/`, {
        pagado: true,
      });
      const data = res.data;
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <li className="apoderado-item">
      <div className="apoderado" onClick={onClick}>
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
            </div>
          </div>
        </div>
        <span>{isVisible ? "🔼" : "🔽"}</span>
      </div>
      <div
        className={`apoderado-detalle ${isVisible ? "visible" : "no-visible"}`}
      >
        <div className="apoderado-list-estudiante">
          <div className="flex">
            <h1>Inscripciones</h1>
            <div className="nuevo-estudiante">
              <button onClick={toggleDialog}>Agregar Inscripción</button>
              <Dialog ref={dialogRef} toggleDialog={toggleDialog}>
                <p>{apoderado.nombre_completo}</p>
                <p>Nueva Inscripción</p>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <label htmlFor="plan">
                    Plan<span>*</span>
                  </label>
                  <select
                    id="plan"
                    value={formData.plan}
                    onChange={handleChange}
                    required
                  >
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
                    value={formData.fecha_inicio}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="fecha_fin">Fecha Fin</label>
                  <input
                    type="date"
                    id="fecha_fin"
                    value={formData.fecha_fin}
                    onChange={handleChange}
                  />
                  <label htmlFor="pagado">Pagado</label>
                  <input
                    type="checkbox"
                    id="pagado"
                    onChange={() =>
                      setFormData({ ...formData, pagado: !formData.pagado })
                    }
                  />

                  <button type="submit">Agregar Estudiante</button>
                </form>
              </Dialog>
            </div>
          </div>
          <div>
            {inscripciones.length > 0
              ? inscripciones.map((insc) => (
                  <div className="apoderado-item-estudiante" key={insc.pk}>
                    <p>{insc.fecha_inicio}</p>
                    <p>{insc.plan_detalle.descripcion}</p>
                    <p>{insc.dias_asistidos} Días asistidos</p>
                    <p>{insc.activa ? "Activa" : "Inactiva"}</p>
                    <p>
                      {insc.pagado ? (
                        "Pagado"
                      ) : (
                        <div>
                          Impago{" "}
                          <button onClick={() => handleClick(insc.pk)}>
                            Pagar
                          </button>
                        </div>
                      )}
                    </p>
                  </div>
                ))
              : "No hay inscripciones"}
          </div>
        </div>
      </div>
    </li>
  );
};

export default ListEstudiante;
