import { NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const NavMenu = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <div className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/create-recipe">Create</NavLink>
      <NavLink to="/saved-recipe">Save</NavLink>
      {!useCookies.access_token ? (
        <NavLink to="/auth">Register/LogIn</NavLink>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
    </div>
  );
};
