import "./styles.css";
import Container from "@mui/material/Container";
import Header from "./components/Header";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";
import News from "./pages/News";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import PageNotFound from "./pages/PageNotFound";
import LogIn from "./pages/LogIn";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/e-co/",
    element: <NavbarWrapper />,
    children: [
      {
        path: "/home",
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
]);

function NavbarWrapper() {
  return (
    <div>
      <Header />
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

export default function App() {
  return <RouterProvider router={router} />;
}
