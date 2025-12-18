import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../apis/apiClient";

const CurrentUserContext = createContext({});

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await apiClient.get("/users/me");
        setCurrentUser(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCurrentUser();
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

// CurrentUserContext を参照できるようにする。
// CurrentUserProvider が提供している value が取れる。
export const useCurrentUser = () => useContext(CurrentUserContext);
