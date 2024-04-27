import "./App.scss";
import Home from "./Pages/home/Home";
import Login from "./Pages/login/Login";
import Register from "./Pages/register/Register";
import PostForm from "./Pages/postForm/PostForm";
import PostsList from "./Pages/postsList/PostsList";
import UpdatePost from "./Pages/updatePost/UpdatePost";
import Post from "./Pages/post/Post";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React, { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

function App() {
  useEffect(() => {
    // Update title
    document.title = "Pattes perdues";

    // Update favicon
    const favicon = document.querySelector('link[rel="icon"]');
    favicon.href = "../Assets/pattes_perdues_logo.png";
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
      element: (
        <PrivateRoute>
          <PostForm />
        </PrivateRoute>
      ),
    },
    {
      path: "/annonces",
      element: <PostsList />,
    },
    {
      path: "/annonce/:id",
      element: <Post />,
    },
    {
      path: "/modification-annonce/:id",
      element: <UpdatePost />,
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
