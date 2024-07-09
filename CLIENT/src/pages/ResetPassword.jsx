import { Link } from "react-router-dom";
import { resetPassword } from "../api/api";
import { useState } from "react";
import FormRow from "../components/FormRow";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      email,
    };

    try {
      const response = await resetPassword(formData); // Calling the resetPassword function from API.js

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
        <h4>Reset Password</h4>
        <p>
          Please provide your email in order to receive a temporary passcode
        </p>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>

        <button className="btn btn-block" type="submit">
          Send Passcode
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

export default ResetPassword;
