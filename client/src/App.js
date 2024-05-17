import "./app.scss";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import PostForm from "./pages/postForm/PostForm";
import PostsList from "./pages/postsList/PostsList";
import Profil from "./pages/profil/Profil";
import Post from "./pages/post/Post";
import PageNotFound from "./pages/notFound/notFound";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React, { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import HappyEndings from "./components/happyEndings/HappyEndings";

function App() {
  useEffect(() => {
    // Update title
    document.title = "Pattes perdues";

    // Update favicon
    const favicon = document.querySelector('link[rel="icon"]');
    favicon.href = "./Assets/pattes_perdues_logo.png";
  }, []);

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
    {
      path: "/deposer-une-annonce",
      element: <PrivateRoute children={<PostForm/>} />,
    },
    {
      path: "/annonces",
      element: <PostsList />,
    },
    {
      path: "/happy-endings",
      element: <HappyEndings />,
    },
    {
      path: "/annonce/:id",
      element: <Post />,
    },
    {
      path: "/modification-annonce/:id",
      element: <PrivateRoute children={<PostForm/>} />,
    },
    {
      path: "/profil/:login",
      element: <PrivateRoute children={<Profil/>} />,
    },
    {
      path: "*",
      element: <PageNotFound />,
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
