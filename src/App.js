import React, { useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";

import "./App.css";
import Root from "./common/Root.jsx";
import Login from "./components/Login/Login.jsx";
import Signup from "./components/Signup/Signup.jsx";
import Home from "./components/Home/Home.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import ModifyProduct from "./components/ModifyProduct/ModifyProduct.jsx";
import Checkout from "./components/Checkout/Checkout.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3e51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

function App() {
  const [userInfo, setUserInfo] = useState(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    return storedUserInfo ? JSON.parse(storedUserInfo) : { token: "", roles: [] };
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root userInfo={userInfo} setUserInfo={setUserInfo} />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/product/:productId",
          element: <ProductDetails />,
        },
        {
          path: "/addProduct",
          element: <ModifyProduct />,
        },
        {
          path: "/checkout/:id",
          element: <Checkout />,
        },
        {
          path: "/update/:productId",
          element: <ModifyProduct />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login userInfo={userInfo} setUserInfo={setUserInfo} />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
