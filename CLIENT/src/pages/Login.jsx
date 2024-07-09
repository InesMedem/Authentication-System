import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext.jsx";
import "./form.css";
import FormRow from "../components/FormRow.jsx";
// import Logo from "../components/Logo.jsx";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      email,
      password,
    };

    try {
      await login(formData); // Calling the loginUser function from API.js

      // Resetting form fields after successful login
      setEmail("");
      setPassword("");

      alert("Login successful!");
    } catch (error) {
      alert(
        `Login failed: something went wrong outside of the normal response handling, likely an issue with the network, server, or unhandled exceptions in the code.`
      );
      console.error(error);
    }
  };

  return (
    <div className="form-wrapper">
      <form className="form" id="loginForm" onSubmit={handleSubmit}>
        <h4 className="title">User Login</h4>

        <label htmlFor="email">Email:</label>
        <FormRow
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <FormRow
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-block " type="submit">
          Login
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
        <p>
          Forgotten your password?
          <Link to="/resetpassword" className="member-btn">
            Reset password
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
