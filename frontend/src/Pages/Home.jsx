import FormApoderado from "../components/FormApoderado";
import { VerticalBarChart } from "../components/VerticalBarChart";
import useChartDataHook from "../hooks/useChartDataHook";
import { Helmet } from "react-helmet";
import "../styles/Home.css";
import Header from "../components/Header";

const DashboardBox = ({ title, desc }) => {
  return (
    <div className="dashboard-box">
      <h2>{title}</h2>
      <h3>{desc}</h3>
    </div>
  );
};

const Home = () => {
  const data = [
    {
      fecha: "2024-05-15",
      tipo_transaccion: "Ingreso",
      categoria: "Pago de Plan",
      monto: "25000",
      desc: "Pago estudiante aslsk",
      apoderado: 5,
      evento: null,
      creado_en: "2024-06-14T18:44:43.543665-03:00",
      actualizado_en: "2024-06-14T18:44:43.543665-03:00",
    },
    {
      fecha: "2024-02-18",
      tipo_transaccion: "Ingreso",
      categoria: "Pago de Plan",
      monto: "50000",
      desc: "sdfdsfsadf",
      apoderado: 9,
      evento: null,
      creado_en: "2024-06-15T17:53:57.577081-03:00",
      actualizado_en: "2024-06-15T17:53:57.577081-03:00",
    },
    {
      fecha: "2024-05-15",
      tipo_transaccion: "Ingreso",
      categoria: "Pago de Plan",
      monto: "27000",
      desc: "Pago estudiante aslsk",
      apoderado: 5,
      evento: null,
      creado_en: "2024-06-14T18:44:43.543665-03:00",
      actualizado_en: "2024-06-14T18:44:43.543665-03:00",
    },
    {
      fecha: "2024-08-15",
      tipo_transaccion: "Ingreso",
      categoria: "Pago de Plan",
      monto: "27000",
      desc: "Pago estudiante aslsk",
      apoderado: 5,
      evento: null,
      creado_en: "2024-06-14T18:44:43.543665-03:00",
      actualizado_en: "2024-06-14T18:44:43.543665-03:00",
    },
  ];
  const a = {};
  // console.log(data);

  const data2 = [
    {
      fecha: "2024-05-15",
      tipo_transaccion: "Ingreso",
      categoria: "Pago de Plan",
      monto: "21000",
      desc: "Pago estudiante aslsk",
      apoderado: 5,
      evento: null,
      creado_en: "2024-06-14T18:44:43.543665-03:00",
      actualizado_en: "2024-06-14T18:44:43.543665-03:00",
    },
    {
      fecha: "2024-02-18",
      tipo_transaccion: "Ingreso",
      categoria: "Pago de Plan",
      monto: "30000",
      desc: "sdfdsfsadf",
      apoderado: 9,
      evento: null,
      creado_en: "2024-06-15T17:53:57.577081-03:00",
      actualizado_en: "2024-06-15T17:53:57.577081-03:00",
    },
    {
      fecha: "2024-05-15",
      tipo_transaccion: "Ingreso",
      categoria: "Pago de Plan",
      monto: "7000",
      desc: "Pago estudiante aslsk",
      apoderado: 5,
      evento: null,
      creado_en: "2024-06-14T18:44:43.543665-03:00",
      actualizado_en: "2024-06-14T18:44:43.543665-03:00",
    },
    {
      fecha: "2024-08-15",
      tipo_transaccion: "Ingreso",
      categoria: "Pago de Plan",
      monto: "21000",
      desc: "Pago estudiante aslsk",
      apoderado: 5,
      evento: null,
      creado_en: "2024-06-14T18:44:43.543665-03:00",
      actualizado_en: "2024-06-14T18:44:43.543665-03:00",
    },
  ];

  const obj = useChartDataHook(data, 6);
  const obj2 = useChartDataHook(data2, 6);
  console.log(obj);
  console.log(Object.keys(obj));
  console.log(Object.values(obj));
  return (
    <main className="main-home">
      <Header title={"Home"} />
      <section className="dashboard-stats">
        <DashboardBox title="25" desc="Estudiantes Presentes" />
        <DashboardBox title="49" desc="Estudiantes Ausentes" />
        <DashboardBox title="74" desc="Planes Activos" />
        <DashboardBox title="1" desc="Evento Agendado" />
      </section>
      {/* <section className="dashboard-charts">
        <div className="chart">
          <VerticalBarChart ChartData={obj} ChartData2={obj2} />
        </div>
      </section> */}
      {/* <FormApoderado /> */}
    </main>
  );
};

export default Home;
