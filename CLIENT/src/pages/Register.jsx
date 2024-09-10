import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormRow from "../components/FormRow.jsx";
import { useAuth } from "../context/authContext.jsx";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);
      const response = await register(formData);

      if (response.status === 200) {
        setName("");
        setEmail("");
        setPassword("");
        setImage(null);

        alert("Registration successful! Check you emial for confirmation code");
        navigate("/dashboard");
      } else {
        alert(
          `Registration failed: user probablly exist already, invalid input, missing data, server-side validation errors, rate limiting, and other API-specific errors`
        );
        setLoading(false);
      }
    } catch (error) {
      alert(
        `Registration failed: something went wrong outside of the normal response handling, likely an issue with the network, server, or unhandled exceptions in the code.`
      );
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      {loading ? (
        <div className="spinner"> Loading... </div>
      ) : (
        <form className="form" id="registrationForm" onSubmit={handleSubmit}>
          <h4>User Registration</h4>
          <label htmlFor="name">Username:</label>
          <FormRow
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
          <p className="text-small">
            Your password must be at least 8 characters long, with 1 lowercase
            letter, 1 uppercase letter, 1 number, and 1 symbol.
          </p>

          <label htmlFor="profileImage">Profile Image (optional):</label>
          <FormRow
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            required={false}
          />

          <button type="submit" className="btn-block">
            Register
          </button>
          <p>
            Already a member yet?
            <Link to="/login" className="member-btn">
              Login
            </Link>
          </p>
        </form>
      )}
    </>
  );
};

export default Register;
