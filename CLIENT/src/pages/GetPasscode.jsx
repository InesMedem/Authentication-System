import { Link } from "react-router-dom";
import { getPasscode } from "../api/api";
import { useState } from "react";

const GetPasscode = () => {
  const [email, setEmail] = useState("");
  console.log("🚀 ~ GetPasscode ~ email:", email);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      email,
    };

    try {
      const response = await getPasscode(formData); // Calling the resetPassword function from API.js
      console.log("🚀 ~ handleSubmit ~ formData:", formData);

      // Resetting form fields after successful reset
      setEmail("");

      if (response.status === 200) {
        alert("Passcode sent successfully!");
      }
    } catch (error) {
      alert(`Passcode sending failed`);
      console.error(error);
    }
  };

  return (
    <div className="form-wrapper">
      <form className="form" id="resetPasswordForm" onSubmit={handleSubmit}>
        <h4>Get Passcode</h4>
        <p>Please provide your email in order to receive a login passcode</p>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>

        <button className="btn btn-block" type="submit">
          Get Passcode
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default GetPasscode;
