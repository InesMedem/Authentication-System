import "./styles.css";
import { useState } from "react";
import { useAuth } from "../context/authContext.jsx";
import FormRow from "../components/FormRow.jsx";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      email,
      password,
    };

    try {
      setLoading(true); // Set loading to true when the login request starts
      const response = await login(formData); // Calling the loginUser function from API.js

      // Resetting form fields after successful login
      if (response.status === 200) {
        setEmail("");
        setPassword("");

        alert("Login successful!");
        navigate("/dashboard");
      } else {
        alert(
          `Login failed: invalid input, missing data, server-side validation errors, rate limiting, and other API-specific errors`
        );
        setLoading(false);
      }
    } catch (error) {
      alert(
        `Login failed: (input did not make it to the server) something went wrong outside of the normal response handling, likely an issue with the network, server, or unhandled exceptions in the code.`
      );
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="form-wrapper">
      {loading ? (
        <div className="spinner"> Loading... </div>
      ) : (
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
            <Link to="/getpasscode" className="member-btn">
              Login with passcode
            </Link>
          </p>
        </form>
      )}
    </div>
  );
};

export default Login;
