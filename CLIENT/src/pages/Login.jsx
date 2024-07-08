import { useContext, useState } from "react";
// import { loginUser } from "../api/api.js";

import { AuthContext } from "../context/authContext.jsx";
import { loginUser } from "../api/api.js";

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
    <div className="container">
      <h2 className="title">User Login</h2>
      <form className="form-row" id="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register here</a>.
      </p>
    </div>
  );
};

export default Login;
