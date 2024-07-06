const Transaccion = ({ transs }) => {
  const { fecha, categoria, desc, monto, apoderado, evento, tipo_transaccion } =
    transs;
  return (
    transs && (
      <li>
        {fecha} {categoria} {monto} {desc} {apoderado} {evento}{" "}
        {tipo_transaccion}
      </li>
    )
  );
};

export default Transaccion;
