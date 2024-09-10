import { Link, useNavigate } from "react-router-dom";
import FormRow from "../components/FormRow";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import { changeName, deleteUser, changeImg } from "../api/api";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, updateUserName, logout, updateUserImage } = useAuth();
  const navigate = useNavigate();

  //* change name
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

  //* change img

  const handleUploadImage = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);

      const response = await changeImg(formData);
      setImage(null);
      setLoading(false);
      if (response.status === 200) {
        updateUserImage(URL.createObjectURL(image));
        alert("Image changed successfully!");
        setLoading(false);
      }
    } catch (error) {
      alert(`Failed to change image`);
      setLoading(false);
      console.error(error);
    }
  };
  console.log("🚀 ~ handleUploadImage ~ image:", image);

  //* delete user

  const handleDeleteUser = async () => {
    try {
      const response = await deleteUser();

      if (response.status === 200) {
        localStorage.removeItem("user");
        logout();
        navigate("/login");
        alert("User deleted successfully");
      }
    } catch (error) {
      alert(`Failed to delete user`);
      console.error(error);
    }
  };
  //* end

  return (
    <>
      {" "}
      {loading ? (
        <div className="spinner"> Loading... </div>
      ) : (
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
          </form>

          {/* Change profile photo */}

          {/* <form onSubmit={handleUploadImage}>
            <label>Change profile photo</label>
            <FormRow
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
            ></FormRow>

            <button className="btn-block" type="submit">
              Change
            </button>
          </form> */}

          <Link to="/changepassword">
            <p>Change password</p>
          </Link>

          <Link>
            <p className="danger-btn" onClick={handleDeleteUser}>
              Delete user
            </p>
          </Link>
        </div>
      )}
    </>
  );
};
export default Dashboard;
