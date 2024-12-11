import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { APIToken } from "../api";
import { toast, Toaster } from "sonner";
import formatDate from "../utils/formatDate";
import formatPrice from "../utils/formatPrice";
import Dialog from "./Dialog";
import { useRef, useState, useEffect } from "react";

const Transaccion = ({ transs, handleDelete }) => {
  const {
    pk,
    fecha: estadoFecha,
    categoria: estadoCategoria,
    desc: estadoDesc,
    monto: estadoMonto,
    apoderado,
    apoderado_desc,
    evento,
    evento_desc,
    tipo_transaccion: estadoTransaccion,
  } = transs;

  const [tipo_transaccion, setTipoTransaccion] = useState(estadoTransaccion);
  const [fecha, setFecha] = useState(estadoFecha);
  const [categoria, setCategoria] = useState(estadoCategoria);
  const [desc, setDesc] = useState(estadoDesc);
  const [monto, setMonto] = useState(estadoMonto);

  useEffect(() => {
    setTipoTransaccion(estadoTransaccion);
    setFecha(estadoFecha);
    setCategoria(estadoCategoria);
    setDesc(estadoDesc);
    setMonto(estadoMonto);
  }, [transs]);

  const formattedPrice = formatPrice(monto);
  const formattedDate = formatDate(fecha);
  const dialogRef = useRef(null);
  const editDialogRef = useRef(null);
  const moneda = tipo_transaccion === "Ingreso" ? "💵" : "⛔";
  const color = tipo_transaccion === "Ingreso" ? "green" : "red";
  const signo = tipo_transaccion === "Ingreso" ? "+" : "-";
  // const formattedPrice = parseInt(monto).toFixed(0);
  const toggleDialog = (e) => {
    if (!dialogRef.current) return;

    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  };

  const handleAlertDelete = () => {
    handleDelete(pk);
    toggleDialog();
  };

  const toggleEditDialog = (e) => {
    if (!editDialogRef.current) return;

    editDialogRef.current.hasAttribute("open")
      ? editDialogRef.current.close()
      : editDialogRef.current.showModal();
  };

  const toggleCloseDialog = () => {
    setTipoTransaccion(estadoTransaccion);
    setFecha(estadoFecha);
    setCategoria(estadoCategoria);
    setDesc(estadoDesc);
    setMonto(estadoMonto);
    toggleEditDialog();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const res = APIToken.patch(`transacciones/${pk}/update/`, {
        tipo_transaccion,
        fecha,
        categoria,
        desc,
        monto,
      });
      const data = res.data;
      toggleEditDialog();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    transs && (
      <li
        className="list-trans"
        style={{
          "--border-color": ` ${
            tipo_transaccion === "Ingreso" ? "#4CAF50" : "#F44336"
          }`,
        }}
      >
        <div className="fecha">
          <span className="data">Fecha: </span>
          {formattedDate}
        </div>
        <div className="categoria">
          <span className="data">Categoría: </span>
          {categoria}
        </div>
        <div className={`monto `} style={{ color: color }}>
          <span className="data">Monto: </span>
          {signo}
          {formattedPrice}
        </div>
        <div className="desc">
          <span className="data">Descripción: </span>
          {desc}
        </div>
        <div className="apoderado">
          <span className="data">Apoderado: </span>
          {apoderado ? apoderado_desc.nombre_completo : "---"}
        </div>
        <div className="evento">
          <span className="data">Evento: </span>
          {evento ? evento_desc.nombre : "---"}
        </div>
        <div className="acciones">
          <span className="data">Acciones: </span>
          <button onClick={toggleEditDialog}>
            <div className="hover-data">Editar</div>
            <FaEdit />
          </button>
          <button onClick={toggleDialog}>
            <div className="hover-data">Eliminar</div>
            <FaTrashCan />
          </button>
        </div>
        <Toaster richColors />
        <Dialog ref={editDialogRef} toggleDialog={toggleCloseDialog}>
          <form action="" onSubmit={handleSubmit} style={{ display: "grid" }}>
            <label htmlFor="fecha">Fecha: </label>
            <input
              type="date"
              name="fecha"
              id="fecha"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
            <label htmlFor="categoria">Categoría: </label>
            <select
              name="categoria"
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="Pago de Plan">Pago de Plan</option>
              <option value="Utensilios">Utensilios</option>
              <option value="Arriendo Local">Arriendo Local</option>
              <option value="Servicios">Servicios</option>
            </select>
            <label htmlFor="desc">Descripción: </label>
            <input
              type="text"
              name="desc"
              id="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <label htmlFor="monto">Monto: </label>
            <input
              type="number"
              name="monto"
              id="monto"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
            />
            <label htmlFor="tipo_transaccion">Tipo: </label>
            <select
              name="tipo_transaccion"
              id="tipo_transaccion"
              value={tipo_transaccion}
              onChange={(e) => setTipoTransaccion(e.target.value)}
            >
              <option value="Ingreso">Ingreso</option>
              <option value="Egreso">Egreso</option>
            </select>
            <div>
              <button>Aceptar</button>
              <button type="button" onClick={toggleCloseDialog}>
                Cancelar
              </button>
            </div>
          </form>
        </Dialog>
        <Dialog ref={dialogRef} toggleDialog={toggleDialog}>
          <p>Desea borrar la transaccion</p>
          <p>Fecha: {fecha}</p>
          <p>Categoría: {categoria}</p>
          <p>Descripción: {desc}</p>
          <p>Monto: {monto}</p>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <button onClick={handleAlertDelete}>Sí</button>
            <button type="button" onClick={toggleDialog}>
              Cancelar
            </button>
          </div>
        </Dialog>
      </li>
    )
  );
};

export default Transaccion;
