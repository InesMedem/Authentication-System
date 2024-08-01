import { Link, useNavigate } from "react-router-dom";
import FormRow from "../components/FormRow";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import { changeName, deleteUser } from "../api/api";

const Dashboard = () => {
  const [name, setName] = useState("");
  const { user, updateUserName } = useAuth();
  const navigate = useNavigate();

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

  const handleDeleteUser = async () => {
    try {
      const response = await deleteUser();

      if (response.status === 200) {
        alert("User deleted successfully");
        localStorage.removeItem("user");
        navigate("/login");
      }
    } catch (error) {
      alert(`Failed to delete user`);
      console.error(error);
    }
  };

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
          <p className="danger-btn" onClick={handleDeleteUser}>
            Delete user
          </p>
        </Link>
      </form>
    </div>
  );
};
export default Dashboard;
