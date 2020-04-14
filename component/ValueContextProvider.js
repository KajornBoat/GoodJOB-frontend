import React, { useState, createContext } from "react";
export const ValueContext = createContext();
export const ValueContextProvider = ({ children }) => {
  const [role, setRole] = useState();
  return (
    <ValueContext.Provider value={{ role, setRole }}>
      {children}
    </ValueContext.Provider>
  );
};
