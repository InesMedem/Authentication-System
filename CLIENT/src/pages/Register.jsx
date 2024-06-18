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

        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
