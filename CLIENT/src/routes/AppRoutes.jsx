import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import { Login, Register, Dashboard, ChangePassword } from "../pages";
import GetPasscode from "../pages/GetPasscode";
import CheckCode from "../pages/CheckCode";
import Home from "../pages/Home";
import RestcountriesAPI from "../api/RestcountriesAPI";

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
        path: "/countries",
        element: <RestcountriesAPI />,
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
