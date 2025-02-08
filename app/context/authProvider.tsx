import React, { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error("Error checking auth:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false); // Ensure loading state is reset
    }
  };
  

  useEffect(() => {
    checkAuth();
  }, []); // No dependencies needed

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
