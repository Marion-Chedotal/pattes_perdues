import "./App.scss";
import Home from "./Pages/home/Home";
// import Navbar from './Components/NavBar/Navbar';
import Login from "./Pages/login/Login";
import Register from "./Pages/register/Register";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/", 
      element: <Home />
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
