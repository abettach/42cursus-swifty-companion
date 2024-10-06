import React, { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";

interface AuthContextType {
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkTokenValidity = async () => {
      const session = await SecureStore.getItem("session");

      if (session) {
        const { expires_at } = JSON.parse(session);

        if (new Date().getTime() < expires_at) {
          setIsAuthenticated(true);
        } else {
          await SecureStore.deleteItemAsync("session");
          setIsAuthenticated(false);
        }
      }
    };

    checkTokenValidity();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
