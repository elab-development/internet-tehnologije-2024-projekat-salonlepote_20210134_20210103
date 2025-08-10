import React, { createContext, useContext, useState } from "react";

// Kreiramo kontekst za autentifikaciju
const AuthContext = createContext(null);

// Provider komponenta koja omotava celu aplikaciju
export function AuthProvider({ children }) {
  // Čuvamo token i korisnika u state-u, inicijalno iz localStorage
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Login funkcija: čuva token i korisnika u localStorage i state
  const login = (newToken, newUser) => {
    console.log("Saving to localStorage:", newToken, newUser);
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  // Logout funkcija: briše podatke i resetuje state
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook za pristup auth kontekstu u komponentama
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
