import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { helpHttp } from "../Helper/helpHttp";

const theContext = createContext();

export const useTheContext = () => {
  const context = useContext(theContext);
  return context;
};

export function UserContext({ children }) {
  const API_URL = "https://coding-challenge-api.aerolab.co/user/me";
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
    },
  };
  const getUser = async () => {
    const response = await Promise.all([helpHttp().get(API_URL, options)]);
    return response[0];
  };

  const { data, status } = useQuery(["user"], getUser);

  if (status === "loading") {
    return <p>Cargando</p>;
  }

  return <theContext.Provider value={{ data }}>{children}</theContext.Provider>;
}
