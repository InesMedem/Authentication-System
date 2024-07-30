import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import { Login, Register, Dashboard, ChangePassword } from "../pages";
import GetPasscode from "../pages/GetPasscode";
// import LoginPasscode from "../pages/LoginPasscode";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      // {
      //   path: "/profile",
      //   element: <Profile />,
      // },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },

      {
        path: "/changepassword",
        element: <ChangePassword />,
      },

      {
        path: "/getpasscode",
        element: <GetPasscode />,
      },
    ],
  },
]);
