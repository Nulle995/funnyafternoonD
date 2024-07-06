import { useEffect, useState } from "react";
import { API, APIToken } from "../api";
import Transaccion from "../components/Transaccion";
const Transacciones = () => {
  const [trans, setTrans] = useState(null);

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
    <div>
      <h1>Transacciones</h1>
      {trans && (
        <ul>
          {trans.map((transs) => {
            return <Transaccion transs={transs} />;
          })}
        </ul>
      )}
    </div>
  );
};

export default Transacciones;
