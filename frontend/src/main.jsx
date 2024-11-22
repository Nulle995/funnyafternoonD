import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";
import { NavProvider } from "./contexts/NavContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <NavProvider>
        <App />
      </NavProvider>
    </UserProvider>
  </React.StrictMode>
);
