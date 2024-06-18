import "./Register.css";

const Register = () => {
  return (
    <>
      <h2>User Registration</h2>
      <form id="registrationForm">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />

        <label htmlFor="profileImage">Profile Image (optional):</label>
        <input
          type="file"
          id="profileImage"
          name="profileImage"
          accept="image/*"
        />

        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
