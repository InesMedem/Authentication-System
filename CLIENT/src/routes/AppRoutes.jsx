import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import {
  Login,
  Register,
  ResetPassword,
  Dashboard,
  ChangePassword,
} from "../pages";

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
        path: "/resetpassword",
        element: <ResetPassword />,
      },
      {
        path: "/changepassword",
        element: <ChangePassword />,
      },
    ],
  },
]);
