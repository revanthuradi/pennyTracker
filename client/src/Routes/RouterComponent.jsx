import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import Signup from '../Pages/Signup';
import Login from '../Pages/Login';
import Home from '../Pages/Home';
const RouterComponent = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "signup", element: <Signup /> },
        { path: "login", element: <Login /> },
        {
          path: "",
          element: <Home />,
          children: [{ path: ":userId", element: <MessagePage /> }],
        },
        { path: "/*", element: <PageNotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default RouterComponent;
