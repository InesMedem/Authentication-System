import "./NavMenu.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const { user, logout } = useContext(AuthContext);

export const NavMenu = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // navigate("/auth")
  };

  return (
    <div className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/register">Register</NavLink>
      {!user}
      <NavLink to="/login">Login</NavLink>
    </div>
  );
};
