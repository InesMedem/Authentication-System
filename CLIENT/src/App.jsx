import { Outlet, Router, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import { NavMenu } from "./components/NavMenu";

function App() {
  return (
    <>
      <NavMenu />
      <Routes>
        <main>
          <Register />
          <Outlet />
        </main>
      </Routes>
    </>
  );
}

export default App;
