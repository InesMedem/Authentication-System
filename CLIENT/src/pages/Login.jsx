import { useContext, useState } from "react";
// import { loginUser } from "../api/api.js";

import "./Login.css";
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
      const response = await loginUser(formData); // Calling the loginUser function from API.js

      if (response.status === 200) {
        // Update context with login function
        login(formData);

        // Resetting form fields after successful login
        setEmail("");
        setPassword("");

        alert("Login successful!");
      } else {
        alert(
          `Login failed: ${response.data.message} invalid credentials, server-side validation errors, rate limiting, and other API-specific errors`
        );
      }
    } catch (error) {
      alert(
        `Login failed: something went wrong outside of the normal response handling, likely an issue with the network, server, or unhandled exceptions in the code.`
      );
      console.error(error);
    }
  };

  return (
    <>
      <h2>User Login</h2>
      <form id="loginForm" onSubmit={handleSubmit}>
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
    </>
  );
};

export default Login;
