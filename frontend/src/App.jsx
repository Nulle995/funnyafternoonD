import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Nav from "./components/Nav";
import FormEstudiante from "./components/FormEstudiante";
import Estudiantes from "./Pages/Estudiantes";
import Acceso from "./Pages/Acceso";
import Apoderados from "./Pages/Apoderados";
import Estudiante from "./Pages/Estudiante";
import Asistencia from "./Pages/Asistencia";
import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Nav>
              <Home />
            </Nav>
          }
        />
        <Route
          path="/apoderados/"
          element={
            <Nav>
              <Apoderados />
            </Nav>
          }
        />
        <Route
          path="/apoderados/:id/estudiante/"
          element={<FormEstudiante />}
        />
        <Route
          path="/apoderados/:id/estudiantes/crear/"
          element={
            <Nav>
              <FormEstudiante />
            </Nav>
          }
        />
        <Route
          path="/estudiantes/"
          element={
            <Nav>
              <Estudiantes />
            </Nav>
          }
        />
        <Route
          path="/estudiantes/:id/"
          element={
            <Nav>
              <Estudiante />
            </Nav>
          }
        />
        <Route
          path="/asistencia/"
          element={
            <Nav>
              <Asistencia />
            </Nav>
          }
        />
        <Route
          path="/acceso/"
          element={
            <Nav>
              <Acceso />
            </Nav>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
