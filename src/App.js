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
import { Route, Routes, Navigate, Outlet, BrowserRouter } from 'react-router-dom';
// Firebase imports
import { auth, db } from './api/firebase';
import { onValue, ref } from "firebase/database";
import { onAuthStateChanged } from 'firebase/auth';

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });
export const UserContext = React.createContext({});


export default function App() {
  const [mode, setMode] = React.useState("light");
  const [user, setUser] = React.useState(null);
  const [userData, setUserData] = React.useState({});

  function PrivateOutlet() {
    return user ? <>
      <Header colorMode={colorMode} theme={theme} userRegion={userData.statsRegion || {}} />
      <Container
        maxWidth="100%"
        sx={{
          display: "flex",
          height: "calc(100vh - 128px) !important",
          justifyContent: "center",
          pt: "64px"
        }}
      >
        <Outlet />
      </Container> </> :
      <Navigate to="/login" />;
  }

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

  React.useEffect(() => {
    if (user)
      onValue(ref(db, `users/${user.uid}`), snapshot => {
        const data = snapshot.val();
        if (data) {
          setUserData(data);
        }
      })
  }, [user])


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

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserContext.Provider value={user}>
          <BrowserRouter basename="/e-co">
            <Routes>
              <Route path="/signup" element={<SignUp colorMode={colorMode} theme={theme} />} />
              <Route path="login" element={<LogIn colorMode={colorMode} theme={theme} />} />
              <Route path="/" element={<PrivateOutlet />}>
                <Route path="/" element={<Home user={userData || {}} />} />
                <Route path="/statistics" element={<Statistics theme={theme} userRegion={userData.statsRegion} />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/news" element={<News />} />
                <Route path="/account" element={<Account colorMode={colorMode} theme={theme} user={userData || {}} />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
