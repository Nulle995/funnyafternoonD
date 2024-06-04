import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APIToken } from "../api";
import { UserContext } from "../contexts/UserContext.jsx";

const FormEstudiante = () => {
  const { id: idApoderado } = useParams();
  const { userData } = useContext(UserContext);
  const [apoderado, setApoderado] = useState();
  const [formData, setFormData] = useState({
    primer_nombre: "",
    segundo_nombre: "",
    tercer_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    rut: "",
    fecha_nacimiento: "",
    apoderado: idApoderado,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await APIToken.post("estudiantes/", formData);
      const data = res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getApoderado = async () => {
      try {
        const res = await APIToken.get(`apoderados/${idApoderado}`);
        const data = res.data;
        console.log(data);
        setApoderado(data);
      } catch (error) {
        console.log(error);
      }
    };
    getApoderado();
  }, [idApoderado]);

  return (
    <div>
      {apoderado && (
        <>
          <h1>
            {`${apoderado.primer_nombre} ${apoderado.segundo_nombre} 
            ${apoderado.tercer_nombre || " "} 
            ${apoderado.primer_apellido} ${apoderado.segundo_apellido}`}
          </h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="primer_nombre">
              Primer Nombre<span>*</span>
            </label>
            <input
              type="text"
              id="primer_nombre"
              value={formData.primer_nombre}
              onChange={handleChange}
            />
            <label htmlFor="segundo_nombre">
              Segundo Nombre<span>*</span>
            </label>
            <input
              type="text"
              id="segundo_nombre"
              value={formData.segundo_nombre}
              onChange={handleChange}
            />
            <label htmlFor="tercer_nombre">Primer Nombre</label>
            <input
              type="text"
              id="tercer_nombre"
              value={formData.tercer_nombre}
              onChange={handleChange}
            />
            <label htmlFor="primer_apellido">
              Primer Apellido<span>*</span>
            </label>
            <input
              type="text"
              id="primer_apellido"
              value={formData.primer_apellido}
              onChange={handleChange}
            />
            <label htmlFor="segundo_apellido">
              Segundo Apellido<span>*</span>
            </label>
            <input
              type="text"
              id="segundo_apellido"
              value={formData.segundo_apellido}
              onChange={handleChange}
            />
            <label htmlFor="rut">
              RUT<span>*</span>
            </label>
            <input
              type="text"
              id="rut"
              value={formData.rut}
              onChange={handleChange}
            />
            <label htmlFor="fecha_nacimiento">
              Fecha de Nacimiento<span>*</span>
            </label>
            <input
              type="date"
              id="fecha_nacimiento"
              value={formData.fecha_nacimiento}
              onChange={handleChange}
            />
            <button>Agregar Estudiante</button>
          </form>
        </>
      )}
    </div>
  );
};

export default FormEstudiante;
