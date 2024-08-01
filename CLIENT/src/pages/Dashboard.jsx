import { Link } from "react-router-dom";
import FormRow from "../components/FormRow";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import { changeName } from "../api/api";

const Dashboard = () => {
  const [name, setName] = useState("");
  const { user, updateUserName } = useAuth();

  const handleSubmitChangename = async (event) => {
    event.preventDefault();

    const formData = {
      name,
    };

    try {
      const response = await changeName(formData); // Calling the resetPassword function from API.js
      setName("");
      if (response.status === 200) {
        updateUserName(name);
        alert("Name changed successfully!");
      }
    } catch (error) {
      alert(`Failed to change name`);
      console.error(error);
    }
  };

  // useEffect(() => {
  //   changeName();
  // }, []);

  return (
    <div className="form">
      <h4 className="title">Update info</h4>
      <p>
        Hi
        <span>
          <strong> {user?.name} </strong>
        </span>
        , you can make changes to your user profile
      </p>
      <form onSubmit={handleSubmitChangename}>
        <label>Change username</label>
        <FormRow
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></FormRow>
        <button className="btn-block" type="submit">
          Change
        </button>

        {/* <label>Change profile photo</label>
        <FormRow
          type="file"
          id="image"
            onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
        ></FormRow> 

        <button className="btn-block ">Change</button> */}

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
