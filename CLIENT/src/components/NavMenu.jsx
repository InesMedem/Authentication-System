import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const NavMenu = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <NavLink to="/">Home</NavLink>

      {user === null && (
        <NavLink to="/register">
          <button> Register</button>
        </NavLink>
      )}

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

      {user !== null ? (
        <NavLink to="/dashboard">
          <img className="icon" src={user?.image} alt={user?.user} />
        </NavLink>
      ) : null}
    </nav>
  );
};
