import * as React from 'react';
// Style imports
import './styles.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// MUI component imports
import Container from '@mui/material/Container';
// Custom component imports
import Header from './components/Header';
// Custom page imports
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import News from './pages/News';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
import PageNotFound from './pages/PageNotFound';
import LogIn from './pages/LogIn';
// Router imports
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavbarWrapper />,
      children: [
        {
          path: "/home",
          element: <Home />
        },
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/sign-up",
          element: <SignUp />
        },
        {
          path: "/log-in",
          element: <LogIn />
        },
        {
          path: "/statistics",
          element: <Statistics />
        },
        {
          path: "/news",
          element: <News />
        },
        {
          path: "/calculator",
          element: <Calculator />
        },
        {
          path: "/settings",
          element: <Settings />
        },
        {
          path: "/account",
          element: <Account />
        },
        {
          path: "*",
          element: <PageNotFound />
        }
      ]
    }
  ], {basename: "/e-co"});

  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#376df4',
          },
          secondary: {
            main: '#f4be37',
          },
        },
      }),
    [mode],
  );

  function NavbarWrapper() {
    return (
      <div>
        <Header colorMode={colorMode} theme={theme}/>
        <Container
          maxWidth="100%"
          sx={{
            display: "flex",
            height: "calc(100vh - 64px)",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Outlet />
        </Container>
      </div>
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
