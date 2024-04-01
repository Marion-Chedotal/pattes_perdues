import "./App.scss";
import Home from "./Pages/home/Home";
// import Navbar from './Components/NavBar/Navbar';
import Login from "./Pages/login/Login";
import Register from "./Pages/register/Register";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
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
      <I18nextProvider i18n={i18n}>
        <RouterProvider router={router} />
      </I18nextProvider>
    </div>
  );
}

export default App;
