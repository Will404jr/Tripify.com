import React, { createContext, useState } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const updateAuthState = (newState) => setIsAuthenticated(newState);

  return (
    <AuthContext.Provider value={{ isAuthenticated, updateAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
