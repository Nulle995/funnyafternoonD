import { createContext, useEffect, useState } from "react";
import { auth, refresh } from "../utils/authorization";
import { jwtDecode } from "jwt-decode";
export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState();
  const [reload, setReload] = useState(false);
  useEffect(() => {
    const getToken = async () => {
      const token = await auth();
      // console.log("sadasd");
      if (token) {
        const decodedToken = jwtDecode(token);
        setUserData(decodedToken);
        // console.log(decodedToken);
      }
    };
    getToken();
  }, [reload]);
  return (
    <UserContext.Provider value={{ userData, reload, setReload }}>
      {children}
    </UserContext.Provider>
  );
}
