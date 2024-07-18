import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { API, APIToken } from "../api";
import Dialog from "../components/Dialog";
import Transaccion from "../components/Transaccion";
import "../styles/Transacciones.css";
import Header from "../components/Header";
const Transacciones = () => {
  const [trans, setTrans] = useState(null);
  const dialogRef = useRef(null);
  const toggleDialog = (e) => {
    if (!dialogRef.current) return;

    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  };
  useEffect(() => {
    const getTransacciones = async () => {
      const res = await API.get("transacciones/");
      const data = res.data;
      console.log(data);
      setTrans(data);
    };
    getTransacciones();
  }, []);

  return (
    <div className="apoderados-body">
      <Header
        title={"Transacciones"}
        placeHolder={"Categoría..."}
        list={trans}
        setList={setTrans}
      />

      <button onClick={toggleDialog}>Nueva Transacción</button>
      <Dialog ref={dialogRef} toggleDialog={toggleDialog}>
        <form action="" className="form-transaccion">
          <label htmlFor="fecha">Fecha: </label>
          <input type="date" id="fecha" required />
          <label htmlFor="tipo">Tipo: </label>
          <select name="" id="tipo" defaultValue="Ingreso" required>
            <option value="Ingreso">Ingreso</option>
            <option value="Egreso">Egreso</option>
          </select>
          <label htmlFor="categoria">Categoría: </label>
          <select name="" id="categoria" defaultValue="Pago de Plan" required>
            <option value="Pago de Plan">Pago de Plan</option>
            <option value="Utensilios">Utensilios</option>
            <option value="Arriendo Local">Arriendo Local</option>
            <option value="Servicio">Servicio</option>
          </select>
          <label htmlFor="monto">Monto: </label>
          <input type="number" name="" id="monto" required />
          <label htmlFor="desc">Desc: </label>
          <input type="text" id="desc" />
        </form>
      </Dialog>
      <div className="transacciones-list">
        {trans && (
          <ul className="list">
            <div className="list-headers">
              <p>Fecha</p>
              <p>Categoría</p>
              <p className="monto">Monto</p>
              <p>Descripción</p>
              <p>Apoderado</p>
              <p>Evento</p>
              <p>Acciones</p>
            </div>
            {trans.map((transs) => {
              return <Transaccion transs={transs} />;
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Transacciones;
