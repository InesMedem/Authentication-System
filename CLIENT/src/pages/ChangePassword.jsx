import { useState } from "react";
import FormRow from "../components/FormRow";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../api/api";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      password,
      newPassword,
    };

    try {
      const response = await resetPassword(formData); // Calling the resetPassword function from API.js

      // Resetting form fields after successful reset
      setNewPassword("");
      setPassword("");

      if (response.status === 200) {
        alert("Password changed successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      alert(`Password change failed`);
      console.error(error);
    }
  };
  return (
    <div className="form-wrapper">
      <form className="form" id="ChangePassword" onSubmit={handleSubmit}>
        <h4>ChangePassword</h4>
        <label htmlFor="password">Old Password</label>
        <FormRow
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="newpassword"> New password</label>
        {/* <p className="text-small">
        Your new password must be at least 8 characters long, with at least 1
        lowercase letter, 1 uppercase letter, 1 number, and 1 symbol.
      </p> */}
        <FormRow
          is="newpassword"
          type="password"
          id="newpassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button className="btn-block" type="submit">
          Change
        </button>
      </form>
    </div>
  );
};
export default ChangePassword;
