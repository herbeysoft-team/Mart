import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import Login from "./pages/auth/Login";
import { Toaster } from "react-hot-toast";
import Layout from "./pages/Layout";
import Dashboard from "./pages/auth/Dashboard";
import Profile from "./pages/auth/Profile";
import User from "./pages/User";
import Listing from "./pages/Listing";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Dashboard />,
      },
      {
        path: "/home/profile",
        element: <Profile/>,
      },
      {
        path: "/home/user",
        element: <User/>,
      },
      {
        path: "/home/listing",
        element: <Listing/>,
      },
    ],
  },
  {
    path: "/",
    element: <Login></Login>,
  },
  {
    path: "*",
    element: <Login></Login>,
  },
]);
function App() {
  const theme = createTheme({
    spacing: 10,
    palette: {
      primary: {
        main: "#0AA1DD",
        light: "#ba68c8",
        dark: "#006E99",
      },
      secondary: {
        main: "#003D55",
        light: "f0b2d7",
        dark: "#c1699d",
      },
    },
    typography: {
      heading: {
        fontSize: 50,
        color: "#0AA1DD",
      },
    },
    components: {
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            // Map the new variant to render a <h1> by default
            heading: "h3",
          },
        },
      },
      MuiListItemButton: {
        defaultProps: {
          disableTouchRipple: true,
        },
      },
      MuiCardHeader: {
        title: {
          fontFamily: "DM Sans",
          fontSize: "40px",
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Toaster ToastPosition="top-center" />
        <RouterProvider router={router}></RouterProvider>
      </main>
    </ThemeProvider>
  );
}

export default App;
