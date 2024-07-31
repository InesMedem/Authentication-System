import { Link } from "react-router-dom";
import FormRow from "../components/FormRow";
import { string } from "prop-types";

const CheckCode = () => {
  return (
    <div className="form-wrapper">
      <form className="form" id="loginForm">
        <h4 className="title">Verify your code 👌</h4>

        <label htmlFor="password">Write the code sent to your email</label>
        <FormRow
          type=""
          id=""
          value={string}
          //   onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-block " type="submit">
          Verify Code
        </button>

        <p>
          Can't finde the code?
          <Link to="/register" className="member-btn">
            Resend code
          </Link>
        </p>
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
export default CheckCode;
