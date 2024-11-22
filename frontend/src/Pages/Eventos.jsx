import Header from "../components/Header";
import "../styles/Eventos.css";
import formatPrice from "../utils/formatPrice";
import formatDate from "../utils/formatDate";

const Eventos = () => {
  const data = [
    {
      nombre: "Florería La Paz",
      desc: "Curso floristería de rosas azules",
      monto: "20000",
      fecha: "05/02/2021",
    },
    {
      nombre: "Florería La Paz",
      desc: "Curso floristería de rosas azules",
      monto: "20000",
      fecha: "05/02/2021",
    },
    {
      nombre: "Florería La Paz",
      desc: "Curso floristería de rosas azules",
      monto: "20000",
      fecha: "05/02/2021",
    },
    {
      nombre: "Florería La Paz",
      desc: "Curso floristería de rosas azules",
      monto: "20000",
      fecha: "05/02/2021",
    },
    {
      nombre: "Florería La Paz",
      desc: "Curso floristería de rosas azules",
      monto: "20000",
      fecha: "05/02/2021",
    },
    {
      nombre: "Florería La Paz",
      desc: "Curso floristería de rosas azules",
      monto: "20000",
      fecha: "05/02/2021",
    },
  ];
  return (
    <div className="apoderados-body">
      <Header title={"Eventos"} />
      <section className="eventos">
        {data &&
          data.map((evento) => {
            const { nombre, desc, monto, fecha } = evento;
            return (
              <article>
                <div className="top">
                  <h3>{nombre}</h3>
                  <p>{desc}</p>
                </div>
                <div className="bottom">
                  <p>💸 {formatPrice(monto)}</p>
                  <p>📅 {formatDate("2024-06-14")}</p>
                </div>
              </article>
            );
          })}
      </section>
    </div>
  );
};

export default Eventos;
