import { createContext, useEffect, useState } from "react";

export const NavContext = createContext();

export function NavProvider({ children }) {
  const [navIsActive, setNavIsActive] = useState(false);

  return (
    <NavContext.Provider value={{ navIsActive, setNavIsActive }}>
      {children}
    </NavContext.Provider>
  );
}
