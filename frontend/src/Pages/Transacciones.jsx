import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { API, APIToken } from "../api";
import { Toaster, toast } from "sonner";
import Dialog from "../components/Dialog";
import Transaccion from "../components/Transaccion";
import "../styles/Transacciones.css";
import Header from "../components/Header";
const Transacciones = () => {
  const [trans, setTrans] = useState(null);
  const [filtered, setFiltered] = useState([]);
  const [filterBy, setFilterBy] = useState("categoria");
  const dialogRef = useRef(null);
  const toggleDialog = (e) => {
    if (!dialogRef.current) return;

    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  };

  const [formData, setFormData] = useState({
    fecha: "",
    tipo_transaccion: "Ingreso",
    categoria: "Pago de Plan",
    monto: "",
    desc: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("transacciones/", formData);
      const data = res.data;
      setFiltered((prev) => [data, ...prev]);
      toast.success("Transacción añadida exitosamente.");
    } catch (e) {
      toast.error(e.message);
    } finally {
      toggleDialog();
    }
  };

  const handleDelete = async (pk) => {
    try {
      const res = await APIToken.delete(`transacciones/${pk}/delete/`);
      const data = res.data;
      const newTrans = filtered.filter((trans) => trans.pk !== pk);
      setFiltered(newTrans);
      toast.success("Transaccion eliminada");
    } catch (e) {}
  };

  useEffect(() => {
    const getTransacciones = async () => {
      const res = await API.get("transacciones/");
      const data = res.data;
      setTrans(data);
      setFiltered(data);
    };
    getTransacciones();
  }, []);

  return (
    <div className="apoderados-body">
      <Header
        title={"Transacciones"}
        placeHolder={"Categoría..."}
        list={filtered}
        setList={setFiltered}
        originalList={trans}
        filterBy={filterBy}
      />

      <button className="btn-agregar" onClick={toggleDialog}>
        Nueva Transacción
      </button>
      <Dialog ref={dialogRef} toggleDialog={toggleDialog}>
        <form action="" className="form-transaccion" onSubmit={handleSubmit}>
          <label htmlFor="fecha">Fecha: </label>
          <input
            type="date"
            id="fecha"
            required
            value={formData.fecha}
            onChange={handleChange}
          />
          <label htmlFor="tipo_transaccion">Tipo: </label>
          <select
            name=""
            id="tipo_transaccion"
            defaultValue="Ingreso"
            required
            value={formData.tipo}
            onChange={handleChange}
          >
            <option value="Ingreso">Ingreso</option>
            <option value="Egreso">Egreso</option>
          </select>
          <label htmlFor="categoria">Categoría: </label>
          <select
            name=""
            id="categoria"
            defaultValue="Pago de Plan"
            required
            value={formData.categoria}
            onChange={handleChange}
          >
            <option value="Pago de Plan">Pago de Plan</option>
            <option value="Utensilios">Utensilios</option>
            <option value="Arriendo Local">Arriendo Local</option>
            <option value="Servicio">Servicio</option>
          </select>
          <label htmlFor="monto">Monto: </label>
          <input
            type="number"
            name=""
            id="monto"
            required
            value={formData.monto}
            onChange={handleChange}
            placeholder="150000"
          />
          <label htmlFor="desc">Descripción: </label>
          <input
            type="text"
            id="desc"
            value={formData.desc}
            onChange={handleChange}
            placeholder="Pago de luz"
          />
          <div>
            <button type="sumbit">Guardar</button>
            <button type="button" onClick={toggleDialog}>
              Cancelar
            </button>
          </div>
        </form>
      </Dialog>
      <div className="transacciones-list">
        {trans && (
          <ul className="list">
            <div className="list-headers">
              <p>Fecha</p>
              <p>Categoría</p>
              <p>Monto</p>
              <p>Descripción</p>
              <p>Apoderado</p>
              <p>Evento</p>
              <p>Acciones</p>
            </div>
            {filtered.map((transs) => {
              return (
                <Transaccion transs={transs} handleDelete={handleDelete} />
              );
            })}
          </ul>
        )}
      </div>
      <Toaster richColors />
    </div>
  );
};

export default Transacciones;
