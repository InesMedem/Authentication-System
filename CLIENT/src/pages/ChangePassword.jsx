import FormRow from "../components/FormRow";

const ChangePassword = () => {
  return (
    <form className="form">
      <h4>ChangePassword</h4>
      <label htmlFor="oldpassword">Old Password</label>
      <FormRow type="password" id="oldpassword" required />
      <label htmlFor="newpassword"> New password</label>
      {/* <p className="text-small">
          Your new password must be at least 8 characters long, with at least 1
          lowercase letter, 1 uppercase letter, 1 number, and 1 symbol.
        </p> */}
      <FormRow type="string" is="newpassword" required />
      <button className="btn-block">Change</button>
    </form>
  );
};
export default ChangePassword;
