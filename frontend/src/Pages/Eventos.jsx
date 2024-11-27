import { useRef } from "react";
import { Toaster, toast } from "sonner";

import Header from "../components/Header";
import "../styles/Eventos.css";
import formatPrice from "../utils/formatPrice";
import formatDate from "../utils/formatDate";
import Dialog from "../components/Dialog.jsx";
import { APIToken } from "../api.js";

const Eventos = () => {
  const dialogRef = useRef(null);
  const formRef = useRef(null);
  const toggleDialog = () => {
    if (!dialogRef.current) return;
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const objectFormData = Object.fromEntries(formData.entries());
    console.log(objectFormData);
    console.log(objectFormData.fecha_inicio);
    try {
      const res = await APIToken.post("eventos/", objectFormData);
      const data = await res.data;
      console.log(data);

      const transaccionInfo = {
        fecha: objectFormData.fecha_inicio,
        tipo_transaccion: "Ingreso",
        categoria: "Arriendo Local",
        monto: objectFormData.monto,
        desc: objectFormData.desc,
        evento: res.data.pk,
      };
      console.log(transaccionInfo);

      const resTransaccion = await APIToken.post(
        "transacciones/",
        transaccionInfo
      );
      const dataTransaccion = resTransaccion.data;
      console.log(dataTransaccion);
    } catch (e) {
      console.log(e);
    }
  };

  const data = [
    {
      nombre: "Florería La Paz",
      desc: "Curso floristería de rosas azules",
      monto: "20000",
      fecha: "05/02/2021",
    },
    {
      nombre: "Florería La Paz",
      desc: "Curso floristería de rosas azules",
      monto: "20000",
      fecha: "05/02/2021",
    },
    {
      nombre: "Florería La Paz",
      desc: "Curso floristería de rosas azules",
      monto: "20000",
      fecha: "05/02/2021",
    },
    {
      nombre: "Florería La Paz",
      desc: "Curso floristería de rosas azules",
      monto: "20000",
      fecha: "05/02/2021",
    },
    {
      nombre: "Florería La Paz",
      desc: "Curso floristería de rosas azules",
      monto: "20000",
      fecha: "05/02/2021",
    },
    {
      nombre: "Florería La Paz",
      desc: "Curso floristería de rosas azules",
      monto: "20000",
      fecha: "05/02/2021",
    },
  ];
  return (
    <div className="apoderados-body">
      <Header title={"Eventos"} />
      <button className="btn-agregar" onClick={toggleDialog}>
        Nuevo Evento
      </button>
      <Toaster richColors />
      <Dialog ref={dialogRef} toggleDialog={toggleDialog}>
        <form action="" ref={formRef} onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Curso Tu Primer Poroto..."
            required
          />
          <label htmlFor="cliente">Cliente: </label>
          <input
            type="text"
            id="cliente"
            name="cliente"
            placeholder="Floristería la Paz, Juan Perez..."
            required
          />
          <label htmlFor="desc">Descripción:</label>
          <input
            type="text"
            id="desc"
            name="desc"
            placeholder="Cómo germinar un poroto"
            required
          />
          <label htmlFor="fecha_inicio">Fecha de Inicio:</label>
          <input type="date" id="fecha_inicio" name="fecha_inicio" required />
          <label htmlFor="fecha_fin">Fecha de Fin:</label>
          <input type="date" id="fecha_fin" name="fecha_fin" required />
          <label htmlFor="monto">Monto: </label>
          <input type="number" name="monto" id="monto" required />
          <button>Aceptar</button>
          <button type="button" onClick={toggleDialog}>
            Cancelar
          </button>
        </form>
      </Dialog>
      <section className="eventos">
        {data &&
          data.map((evento) => {
            const { nombre, desc, monto, fecha } = evento;
            return (
              <article>
                <div className="top">
                  <h3>{nombre}</h3>
                  <p>{desc}</p>
                </div>
                <div className="bottom">
                  <p>💸 {formatPrice(monto)}</p>
                  <p>📅 {formatDate("2024-06-14")}</p>
                </div>
              </article>
            );
          })}
      </section>
    </div>
  );
};

export default Eventos;
