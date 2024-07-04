import "./NavMenu.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

// const { user, logout } = useContext(AuthContext);

export const NavMenu = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/register">Register</NavLink>
      {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </div>
  );
};
