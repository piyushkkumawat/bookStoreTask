import React, { createContext, useContext, useState } from "react";

// Create SingleOrderContext
const SingleOrderContext = createContext();

// Custom hook to use SingleOrderContext
export const useSingleOrderData = () => useContext(SingleOrderContext);

// SingleOrderProvider component
const SingleOrderProvider = ({ children }) => {
  const [name, setName] = useState("1");

  return (
    <SingleOrderContext.Provider value={name}>
      {children}
    </SingleOrderContext.Provider>
  );
};

export default SingleOrderProvider;
