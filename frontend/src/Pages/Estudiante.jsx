import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { APIToken } from "../api";

import Dialog from "../components/Dialog";

import "../styles/Estudiante.css";
const Estudiante = () => {
  const { id } = useParams();
  console.log(id);
  const [estudiante, setEstudiante] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [inscripciones, setInscripciones] = useState(null);
  const [inscripcionesActivas, setInscripcionesActivas] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const dialogRef = useRef(null);
  const date = new Date();
  const day = date.getDate();
  const month = new String(date.getMonth() + 1).padStart(2, 0);
  const year = date.getFullYear();
  const now = `${year}-${month}-${day}`;
  const [formData, setFormData] = useState({
    plan: 1,
    estudiante: id,
    fecha_inicio: now,
    fecha_fin: undefined,
    pagado: false,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.info("Cargando...");
    const newPlan = async () => {
      try {
        const res = await APIToken.post("inscripciones/", formData);
        toast.success("Se añadió el plan exitosamente");
        const data = res.data;
        console.log(data);
      } catch (error) {
        console.log(error);
        toast.error(
          "Hubo un error. El estudiante puede tener un plan activo o impago."
        );
      }
    };
    newPlan();
  };

  const handlePay = async (id) => {
    toast.info("Cargando...");
    try {
      const res = await APIToken.patch(`inscripciones/${id}/update/`, {
        pagado: true,
      });
      toast.success("El pago fue exitoso!");
      const data = res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Hubo un error, intentelo de nuevo.");
    }
  };

  const toggleDialog = (e) => {
    if (!dialogRef.current) return;

    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  };

  useEffect(() => {
    const getEstudiante = async () => {
      const res = await APIToken.get(`estudiantes/${id}/`);
      const data = res.data;
      console.log(data);
      setEstudiante(data);
      const activas = data.inscripciones.filter(
        (inscripcion) => inscripcion.activa
      );
      const pasadas = data.inscripciones.filter(
        (inscripcion) => !inscripcion.activa
      );
      console.log(activas);
      console.log(pasadas);
      setInscripciones(pasadas);
      setInscripcionesActivas(activas);
    };
    getEstudiante();
    console.log(formData);
    console.log(now);
  }, [id]);
  return (
    <div className="estudiante">
      <section className="estudiante-detalle">
        <Toaster richColors />
        {estudiante && (
          <section>
            <article>
              <div className="titulo">
                <div className="imagen">
                  <img
                    src="https://media1.popsugar-assets.com/files/thumbor/EQTi01DEi2lr324_T2rA3sm39ic/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2020/08/14/624/n/24155406/9edeafc27d7a50ee_70701382_183100509518051_7114000417055715454_n/i/Am-I-Doing-It.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <h1>{estudiante.nombre_completo}</h1>
                  <p>Fecha de Nacimiento: {estudiante.fecha_nacimiento}</p>
                  <p>RUT: {estudiante.rut}</p>
                </div>
              </div>
            </article>
            <div>
              <header>
                <h1>Planes</h1>
                <button onClick={() => setIsVisible(!isVisible)}>
                  Nuevo Plan
                </button>
              </header>
              <hr />
              <div>
                {isVisible && (
                  <form onSubmit={handleSubmit}>
                    <select
                      id="plan"
                      value={formData.plan}
                      onChange={handleChange}
                    >
                      <option value={2}>Diario</option>
                      <option value={1}>Semanal</option>
                      <option value={3}>Mensual</option>
                    </select>
                    <label htmlFor="fecha_inicio">Fecha de inicio</label>
                    <input
                      type="date"
                      id="fecha_inicio"
                      value={formData.fecha_inicio}
                      onChange={handleChange}
                    />
                    <label htmlFor="fecha_fin">Fecha de fin</label>
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
                      value={formData.pagado}
                      onChange={() =>
                        setFormData({ ...formData, pagado: !formData.pagado })
                      }
                    />
                    <button>Agregar Plan</button>
                  </form>
                )}
              </div>

              <div>
                Activo:
                {inscripcionesActivas.length
                  ? inscripcionesActivas.map((inscripcion) => (
                      <div key={inscripcion.pk}>
                        {inscripcion.pk} <br />
                        {inscripcion.plan_detalle.descripcion} <br />
                        {inscripcion.fecha_inicio}
                        <p>
                          {inscripcion.plan_detalle.duracion_dias -
                            inscripcion.dias_asistidos}
                          días restantes
                        </p>
                        {inscripcion?.fecha_fin}
                        <div>
                          Estado:{" "}
                          {inscripcion.pagado ? (
                            "Pagado"
                          ) : (
                            <>
                              No pago{" "}
                              <button onClick={toggleDialog}>Pagar</button>
                              <Dialog
                                ref={dialogRef}
                                toggleDialog={toggleDialog}
                              >
                                ⚠️ ¿Desea pagar? Esto generará una nueva
                                transacción con el valor de:{" "}
                                {inscripcion.plan_detalle.precio}
                                <button
                                  onClick={() => {
                                    handlePay(inscripcion.pk);
                                    toggleDialog(false);
                                  }}
                                >
                                  Aceptar
                                </button>
                              </Dialog>
                            </>
                          )}
                        </div>
                      </div>
                    ))
                  : " No hay inscripciones activas..."}
              </div>
              <div>
                Anteriores:
                {inscripciones.length
                  ? inscripciones.map((inscripcion) => (
                      <div key={inscripcion.pk}>
                        {inscripcion.plan_detalle.descripcion}{" "}
                        {inscripcion.fecha_inicio}{" "}
                        <p>
                          {inscripcion.plan_detalle.duracion_dias -
                            inscripcion.dias_asistidos}{" "}
                          días restantes
                        </p>
                        {inscripcion?.fecha_fin}
                        <div>
                          Estado:{" "}
                          {inscripcion.pagado ? (
                            "Pagado"
                          ) : (
                            <>
                              No pago{" "}
                              <button onClick={toggleDialog}>Pagar</button>
                              <Dialog
                                ref={dialogRef}
                                toggleDialog={toggleDialog}
                              >
                                ⚠️ ¿Desea pagar? Esto generará una nueva
                                transacción con el valor de:{" "}
                                {inscripcion.plan_detalle.precio}
                                <button
                                  onClick={() => handlePay(inscripcion.pk)}
                                >
                                  Aceptar
                                </button>
                              </Dialog>
                            </>
                          )}
                        </div>
                      </div>
                    ))
                  : " No hay inscripciones anteriores..."}
              </div>
            </div>
          </section>
        )}
      </section>
      <aside></aside>
    </div>
  );
};

export default Estudiante;
