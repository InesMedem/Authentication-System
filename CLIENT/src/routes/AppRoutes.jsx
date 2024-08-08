import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import {
  Login,
  Register,
  Dashboard,
  ChangePassword,
  CheckCode,
} from "../pages";
import GetPasscode from "../pages/GetPasscode";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },

      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      // inside the app
      {
        path: "/changepassword",
        element: <ChangePassword />,
      },
      // only for Register and Login functions
      {
        path: "/checkcode",
        element: <CheckCode />,
      },

      // outside the app
      {
        path: "/getpasscode",
        element: <GetPasscode />,
      },
    ],
  },
]);
