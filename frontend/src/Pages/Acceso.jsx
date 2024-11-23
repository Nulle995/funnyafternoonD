import { useState, useContext } from "react";
import { API } from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { UserContext } from "../contexts/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
const Acceso = () => {
  const { reload, setReload } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
    const res = await API.post("api-auth/", formData);
    const data = res.data;
    console.log(data);
    localStorage.setItem(ACCESS_TOKEN, data.access);
    localStorage.setItem(REFRESH_TOKEN, data.refresh);
    setReload(!reload);
    navigate("/");
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Nombre de Usuario: </label>
        <input
          type="text"
          id="username"
          required
          value={formData.username}
          onChange={handleChange}
        />
        <label htmlFor="password">Contraseña: </label>
        <input
          type="password"
          id="password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <button>Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Acceso;
