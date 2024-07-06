import { NavLink, useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/authContext";

export const NavMenu = () => {
  // const { user, logout } = useContext(AuthContext);

  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   logout();
  //   navigate("/login");
  // };

  return (
    <div className="container justify-between ">
      <button className="btn-hipster">
        <NavLink to="/">Home</NavLink>
      </button>

      <button className="btn-hipster">
        <NavLink to="/register">Register</NavLink>
      </button>
      {/* {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )} */}
      <button className="btn-hipster">
        <NavLink to="/login">Login</NavLink>
      </button>
    </div>
  );
};
