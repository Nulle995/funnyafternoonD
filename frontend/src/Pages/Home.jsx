import FormApoderado from "../components/FormApoderado";
import { VerticalBarChart } from "../components/VerticalBarChart";
import "../styles/Home.css";

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
    { title: "20-26-2", qty: 130 },
    { title: "20-21-2", qty: 180 },
    { title: "20-25-2", qty: 210 },
    { title: "20-27-2", qty: 120 },
    { title: "20-26-2", qty: 100 },
    { title: "20-26-2", qty: 170 },
  ];
  return (
    <main className="main-home">
      <section className="dashboard-stats">
        <DashboardBox title="25" desc="Estudiantes Presentes" />
        <DashboardBox title="49" desc="Estudiantes Ausentes" />
        <DashboardBox title="74" desc="Planes Activos" />
        <DashboardBox title="1" desc="Evento Agendado" />
      </section>
      <section className="dashboard-charts">
        <div className="chart">
          <VerticalBarChart ChartData={data} />
        </div>
      </section>
      {/* <FormApoderado /> */}
    </main>
  );
};

export default Home;
