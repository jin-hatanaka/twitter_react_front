import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../apis/apiClient";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiClient.get("/users/me");
        setUser(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchUser();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

// UserContext を参照できるようにする。
// UserProvider が提供している value が取れる。
export const useUser = () => useContext(UserContext);
