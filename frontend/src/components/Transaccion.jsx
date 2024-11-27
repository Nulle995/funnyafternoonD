import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { APIToken } from "../api";
import { toast, Toaster } from "sonner";
import formatDate from "../utils/formatDate";
import formatPrice from "../utils/formatPrice";
import Dialog from "./Dialog";
import { useRef } from "react";

const Transaccion = ({ transs, handleDelete }) => {
  console.log(transs);

  const {
    pk,
    fecha,
    categoria,
    desc,
    monto,
    apoderado,
    apoderado_desc,
    evento,
    evento_desc,
    tipo_transaccion,
  } = transs;
  const formattedPrice = formatPrice(monto);
  const formattedDate = formatDate(fecha);
  const dialogRef = useRef(null);
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
          <button>
            <div className="hover-data">Editar</div>
            <FaEdit />
          </button>
          <button onClick={toggleDialog}>
            <div className="hover-data">Eliminar</div>
            <FaTrashCan />
          </button>
        </div>
        <Toaster richColors />
        <Dialog ref={dialogRef} toggleDialog={toggleDialog}>
          Desea borrar
          <button onClick={handleAlertDelete}>Sí</button>
        </Dialog>
      </li>
    )
  );
};

export default Transaccion;
