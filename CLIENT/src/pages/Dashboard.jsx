import { Link } from "react-router-dom";
import FormRow from "../components/FormRow";

const Dashboard = () => {
  return (
    <div className="form">
      <h4 className="title">Update info</h4>
      <p>
        Hi <span>Ines Medem </span>, you can make changes to your user profile
      </p>
      <form>
        <label>Change username</label>
        <FormRow></FormRow>
        <button className="btn-block ">Change</button>
        <label>Change profile photo</label>
        <FormRow
          type="file"
          id="image"
          //   onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
        ></FormRow>

        <button className="btn-block ">Change</button>
        <Link to="/changepassword">
          <p>Change password</p>
        </Link>
        <Link>
          <p className="danger-btn">Delete user</p>
        </Link>
      </form>
    </div>
  );
};
export default Dashboard;
