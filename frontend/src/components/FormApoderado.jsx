import { useState, useContext } from "react";
import { APIToken } from "../api.js";
import { UserContext } from "../contexts/UserContext.jsx";
import "../styles/FormApoderado.css";

const FormApoderado = () => {
  const { userData } = useContext(UserContext);

  const [formData, setFormData] = useState({
    primer_nombre: "",
    segundo_nombre: "",
    tercer_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    rut: "",
    telefono: "",
    email: "",
    fecha_nacimiento: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await APIToken.post("apoderados/", formData);
      const data = res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-apoderado">
      <label htmlFor="primer_nombre">
        Primer Nombre<span>*</span>:
      </label>
      <input
        type="text"
        id="primer_nombre"
        required
        value={formData.primer_ombre}
        onChange={handleChange}
      />
      <label htmlFor="segundo_nombre">
        Segundo Nombre<span>*</span>:
      </label>
      <input
        type="text"
        id="segundo_nombre"
        required
        value={formData.segundo_nombre}
        onChange={handleChange}
      />
      <label htmlFor="tercer_nombre">Tercer Nombre:</label>
      <input
        type="text"
        id="tercer_nombre"
        value={formData.tercer_nombre}
        onChange={handleChange}
      />
      <label htmlFor="primer_apellido">
        Primer Apellido<span>*</span>:
      </label>
      <input
        type="text"
        id="primer_apellido"
        required
        value={formData.primer_apellido}
        onChange={handleChange}
      />
      <label htmlFor="segundo_apellido">
        Segundo Apellido<span>*</span>:
      </label>
      <input
        type="text"
        id="segundo_apellido"
        required
        value={formData.segundo_apellido}
        onChange={handleChange}
      />
      <label htmlFor="rut">
        RUT<span>*</span>:
      </label>
      <input
        type="text"
        id="rut"
        required
        value={formData.rut}
        onChange={handleChange}
      />
      <label htmlFor="telefono">
        Teléfono<span>*</span>:
      </label>
      <input
        type="text"
        id="telefono"
        required
        value={formData.telefono}
        onChange={handleChange}
      />
      <label htmlFor="email">
        Email<span>*</span>:
      </label>
      <input
        type="email"
        id="email"
        required
        value={formData.email}
        onChange={handleChange}
      />
      <label htmlFor="fecha_nacimiento">
        Fecha de Nacimiento<span>*</span>:
      </label>
      <input
        type="date"
        id="fecha_nacimiento"
        required
        value={formData.fecha_nacimiento}
        onChange={handleChange}
      />
      <button>Agregar Apoderado</button>
    </form>
  );
};

export default FormApoderado;
