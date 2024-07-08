import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const NavMenu = () => {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container justify-between ">
      <NavLink to="/">
        <button>Home</button>
      </NavLink>

      <NavLink to="/register">
        <button> Register</button>
      </NavLink>

      {user ? (
        <NavLink>
          <button className="danger-btn" onClick={handleLogout}>
            Logout
          </button>
        </NavLink>
      ) : (
        <NavLink to="/login">
          <button>Login </button>
        </NavLink>
      )}
    </div>
  );
};
