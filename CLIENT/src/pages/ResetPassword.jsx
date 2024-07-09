import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <div className="form-wrapper">
      <form className="form" id="resetPasswordForm">
        <h4>Reset Password</h4>
        <p>
          Please provide your email in order to receive a temporary passcode
        </p>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" required />
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
