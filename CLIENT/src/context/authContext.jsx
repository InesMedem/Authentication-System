import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../api/api.js";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  // const [loading, setLoading] = useState(true);

  // const [deleteUser, setDeleteUser] = useState(false);

  // const [allUser, setAllUser] = useState({
  //   data: {
  //     confirmationCode: "",
  //     user: {
  //       password: "",
  //       email: "",
  //       name: "",
  //     },
  //   },
  // });

  //* bridge data

  // const bridgeData = (state) => {
  //   const data = localStorage.getItem('data');
  //   const dataJson = JSON.parse(data);
  //   console.log(dataJson);
  //   switch (state) {
  //     case 'ALLUSER':
  //       setAllUser(dataJson);
  //       localStorage.removeItem('data');

  //       break;

  //     default:
  //       break;
  //   }
  // };

  //* Function to check if user is authenticated

  //* Login function

  const login = async (formData) => {
    try {
      const response = await loginUser(formData);
      const { user, token } = response.data;

      const userInfo = {
        name: user.name,
        email: user.email,
        token: token,
        image: user.image,
      };

      const userInfoString = JSON.stringify(userInfo);
      localStorage.setItem("user", userInfoString);
      localStorage.setItem("token", token);
      setUser(user);
      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  //* Register function

  const register = async (formData) => {
    try {
      const response = await registerUser(formData);
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      return response;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  //* Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    // Check local storage for user data on app load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
