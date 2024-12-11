import { useState, useEffect, useRef } from "react";
import formatDate from "../utils/formatDate";
import formatPrice from "../utils/formatPrice";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import Dialog from "./Dialog";
import { APIToken } from "../api";

const Evento = ({ evento, onDelete }) => {
  const [nombre, setNombre] = useState(evento.nombre);
  const [desc, setDesc] = useState(evento.desc);
  const [monto, setMonto] = useState(evento.monto);
  const [fecha_inicio, setInicio] = useState(evento.fecha_inicio);
  const [fecha_fin, setFin] = useState(evento.fecha_fin);
  const [cliente, setCliente] = useState(evento.cliente);
  const dialogRef = useRef(null);
  const dialogDeleteRef = useRef(null);
  useEffect(() => {
    setNombre(evento.nombre);
    setDesc(evento.desc);
    setMonto(evento.monto);
    setInicio(evento.fecha_inicio);
    setFin(evento.fecha_fin);
    setCliente(evento.cliente);
  }, [evento]);

  const toggleDialog = () => {
    if (!dialogRef.current) return;
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  };

  const toggleCloseDialog = () => {
    setNombre(evento.nombre);
    setDesc(evento.desc);
    setMonto(evento.monto);
    setInicio(evento.fecha_inicio);
    setFin(evento.fecha_fin);
    setCliente(evento.cliente);
    toggleDialog();
  };

  const toggleDialogDelete = () => {
    if (!dialogDeleteRef.current) return;
    dialogDeleteRef.current.hasAttribute("open")
      ? dialogDeleteRef.current.close()
      : dialogDeleteRef.current.showModal();
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await APIToken.patch(`eventos/${evento.pk}/update/`, {
        nombre,
        desc,
        monto,
        fecha_inicio,
        fecha_fin,
        monto,
        cliente,
      });
      const data = res.data;
      console.log(data);
    } catch (e) {
      console.log(e);
    } finally {
      toggleDialog();
    }
  };
  const handleDelete = (pk) => {
    onDelete(pk);
    toggleDialogDelete();
  };

  return (
    <article>
      <div className="top">
        <h3>{nombre}</h3>
        <p>{desc}</p>
      </div>
      <div className="bottom">
        <div>
          <p>
            📅 {formatDate(fecha_inicio)} - {formatDate(fecha_fin)}
          </p>
          <p>🕵️‍♂️ {cliente}</p>

          <p className="monto">${formatPrice(monto)}</p>
        </div>
        <div className="actions">
          <button onClick={toggleDialog}>
            <div className="hover-data">Editar</div>
            <FaEdit />
          </button>
          <button onClick={toggleDialogDelete}>
            <div className="hover-data">Eliminar</div>
            <FaTrashCan />
          </button>
        </div>
      </div>
      <Dialog ref={dialogRef} toggleDialog={toggleCloseDialog}>
        <form action="" onSubmit={handleEdit}>
          <label htmlFor="nombre">Nombre: </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            id="nombre"
            name="nombre"
          />
          <label htmlFor="desc">Descripción: </label>
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            id="desc"
            name="desc"
          />
          <label htmlFor="fecha_inicio">Fecha de Inicio: </label>
          <input
            type="date"
            value={fecha_inicio}
            onChange={(e) => setInicio(e.target.value)}
            id="fecha_inicio"
            name="fecha_inicio"
          />
          <label htmlFor="fecha_fin">Fecha de Fin: </label>
          <input
            type="date"
            value={fecha_fin}
            onChange={(e) => setFin(e.target.value)}
            id="fecha_fin"
            name="fecha_fin"
          />
          <label htmlFor="cliente">Cliente: </label>
          <input
            type="text"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            id="cliente"
            name="cliente"
          />
          <label htmlFor="Monto">Monto: </label>
          <input
            type="number"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            id="monto"
            name="monto"
          />
          <div>
            <button>Aceptar</button>
            <button type="button" onClick={toggleCloseDialog}>
              Cancelar
            </button>
          </div>
        </form>
      </Dialog>
      <Dialog ref={dialogDeleteRef} toggleDialog={toggleDialogDelete}>
        <p>¿Desea eliminar el evento {nombre}?</p>
        <p>Cliente: {cliente}</p>
        <p>Monto: {monto}</p>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button onClick={() => handleDelete(evento.pk)}>Aceptar</button>
          <button type="button" onClick={toggleDialogDelete}>
            Cancelar
          </button>
        </div>
      </Dialog>
    </article>
  );
};

export default Evento;
