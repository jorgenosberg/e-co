import * as React from "react";
// Style imports
import "./styles.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// MUI component imports
import Container from "@mui/material/Container";
// Custom component imports
import Header from "./components/Header";
// Custom page imports
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";
import News from "./pages/News";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import PageNotFound from "./pages/PageNotFound";
import LogIn from "./pages/LogIn";
// Router imports
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// Firebase imports
import { auth } from './api/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });
export const UserContext = React.createContext({});

export default function App() {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#376df4",
          },
          secondary: {
            main: "#f4be37",
          },
        },
      }),
    [mode]
  );

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <NavbarWrapper />,
        children: [
          {
            path: "/home",
            element: <Home />,
          },
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/signup",
            element: <SignUp />,
          },
          {
            path: "/login",
            element: <LogIn />,
          },
          {
            path: "/statistics",
            element: <Statistics />,
          },
          {
            path: "/news",
            element: <News />,
          },
          {
            path: "/calculator",
            element: <Calculator />,
          },
          {
            path: "/settings",
            element: <Settings />,
          },
          {
            path: "/account",
            element: <Account colorMode={colorMode} theme={theme} />,
          },
          {
            path: "*",
            element: <PageNotFound />,
          },
        ],
      },
    ],
    { basename: "/e-co" }
  );

  function NavbarWrapper() {
    const [user, setUser] = React.useState({});

    React.useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          console.log('User signed out');
        }
      });

      return () => {
        unsubscribe();
      };
    }, [])

    return (
      <UserContext.Provider value={user}>
        <Header colorMode={colorMode} theme={theme} />
        <Container
          maxWidth="100%"
          sx={{
            display: "flex",
            height: "calc(100vh - 64px)",
            justifyContent: "center",
            pt: "64px",
          }}
        >
          <Outlet />
        </Container>
      </UserContext.Provider>
    );
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
