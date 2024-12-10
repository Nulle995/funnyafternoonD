import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

import Header from "../components/Header";
import "../styles/Eventos.css";
import formatPrice from "../utils/formatPrice";
import formatDate from "../utils/formatDate";
import Dialog from "../components/Dialog.jsx";
import { APIToken } from "../api.js";
import Evento from "../components/Evento.jsx";

const Eventos = () => {
  const [eventos, setEventos] = useState(null);
  const [filtered, setFiltered] = useState(null);
  const [filterBy, setFilterBy] = useState("nombre");
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
      setFiltered((prev) => [data, ...prev]);
      toggleDialog();
    } catch (e) {
      console.log(e);
    }
  };
  const handleDelete = async (pk) => {
    try {
      const res = await APIToken.delete(`eventos/${pk}/delete/`);
      const data = res.data;
      console.log(data);
      const newEvents = filtered.filter((evento) => evento.pk !== pk);
      setFiltered(newEvents);
    } catch (e) {
      console.log(e);
    }
  };
  const handleNewTrans = async (transaccion) => {
    console.log(transaccion);
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

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await APIToken.get("eventos/");
        const data = res.data;
        setEventos(data);
        setFiltered(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  return (
    <div className="apoderados-body">
      <Header
        title={"Eventos"}
        list={filtered}
        setList={setFiltered}
        originalList={eventos}
        filterBy={filterBy}
      />
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
        {filtered &&
          filtered.map((evento) => (
            <Evento evento={evento} onDelete={handleDelete} />
          ))}
      </section>
    </div>
  );
};

export default Eventos;
