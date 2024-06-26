import { createContext, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types"; // Import PropTypes
import { loginUser, registerUser } from "../api/api.js";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //* Function to check if user is authenticated

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  //* Login function

  const login = async (formData) => {
    try {
      const response = await loginUser.loginUser(formData);
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  //* Register function

  const register = async (formData) => {
    try {
      const response = await registerUser.registerUser(formData);
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  //* Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
