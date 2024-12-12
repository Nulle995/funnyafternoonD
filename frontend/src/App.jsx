import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Nav from "./components/Nav";
import FormEstudiante from "./components/FormEstudiante";
import Estudiantes from "./Pages/Estudiantes";
import Acceso from "./Pages/Acceso";
import Apoderados from "./Pages/Apoderados";
import Estudiante from "./Pages/Estudiante";
import Asistencia from "./Pages/Asistencia";
import Eventos from "./Pages/Eventos";
import "./styles/App.css";
import Transacciones from "./Pages/Transacciones";
import ProtectedRoute from "./components/ProtectedRoute";
import { Helmet } from "react-helmet";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Nav>
                <Home />
                <Helmet>
                  <title>Home</title>
                </Helmet>
              </Nav>
            </ProtectedRoute>
          }
        />
        <Route
          path="/apoderados/"
          element={
            <ProtectedRoute>
              <Nav>
                <Apoderados />
                <Helmet>
                  <title>Apoderados</title>
                </Helmet>
              </Nav>
            </ProtectedRoute>
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
            <ProtectedRoute>
              <Nav>
                <Helmet>
                  <title>Estudiantes</title>
                </Helmet>
                <Estudiantes />
              </Nav>
            </ProtectedRoute>
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
            <ProtectedRoute>
              <Nav>
                <Asistencia />
                <Helmet>
                  <title>Asistencia</title>
                </Helmet>
              </Nav>
            </ProtectedRoute>
          }
        />
        <Route
          path="/acceso/"
          element={
            <Nav>
              <Acceso />
              <Helmet>
                <title>Acceso</title>
              </Helmet>
            </Nav>
          }
        />
        <Route
          path="/transacciones/"
          element={
            <ProtectedRoute>
              <Nav>
                <Transacciones />
                <Helmet>
                  <title>Transacciones</title>
                </Helmet>
              </Nav>
            </ProtectedRoute>
          }
        />
        <Route
          path="/eventos/"
          element={
            <ProtectedRoute>
              <Nav>
                <Eventos />
                <Helmet>
                  <title>Eventos</title>
                </Helmet>
              </Nav>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
