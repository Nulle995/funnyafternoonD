const Transaccion = ({ transs }) => {
  const { fecha, categoria, desc, monto, apoderado, evento, tipo_transaccion } =
    transs;
  const moneda = tipo_transaccion === "Ingreso" ? "💵" : "⛔";
  const color = tipo_transaccion === "Ingreso" ? "green" : "red";
  const signo = tipo_transaccion === "Ingreso" ? "+" : "-";
  return (
    transs && (
      <li className="list-trans">
        <span className="fecha">{fecha}</span>
        <span className="categoria">{categoria}</span>
        <span className={`monto `} style={{ color: color }}>
          {signo}
          {monto}
        </span>
        <span className="desc">{desc}</span>
        <span className="apoderado">{apoderado}</span>
        <span className="evento">{evento}</span>
        <span className="acciones">
          <button>E</button> <button>B</button>
        </span>
      </li>
    )
  );
};

export default Transaccion;
