import { useState } from "react";
import registerUser from "../api/api.js";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

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
      const response = await registerUser(formData); // Calling the registerUser function from API.js

      if (response.status === 200) {
        // Resetting form fields after successful registration
        setName("");
        setEmail("");
        setPassword("");
        setImage(null);

        alert("Registration successful! Check you emial for confirmation code");
      } else {
        alert(
          `Registration failed: invalid input, missing data, server-side validation errors, rate limiting, and other API-specific errors`
        );
      }
    } catch (error) {
      alert(
        `Registration failed: something went wrong outside of the normal response handling, likely an issue with the network, server, or unhandled exceptions in the code.`
      );
      console.error(error);
    }
  };

  return (
    <>
      <h2>User Registration</h2>
      <form id="registrationForm" onSubmit={handleSubmit}>
        <label htmlFor="name">Username:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <label htmlFor="profileImage">Profile Image (optional):</label>
        <input
          type="file"
          id="image"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
        />

        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
