import { createContext, createElement, useEffect, useState } from "react";
import { getme } from "./services/auth.api";
export const AuthContext =  createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAndSetUser = async () => {
      try {
        const data = await getme();
        setUser(data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getAndSetUser();
  }, []);

  return createElement(
    AuthContext.Provider,
    { value: { user, loading, setUser, setLoading } },
    children
  );
};