import * as React from "react";
import LogInForm from "../components/LogInForm";
import Container from "@mui/material/Container";
import { ReactComponent as Logo } from "../assets/logo.svg";

function LogIn() {
  return <Container
    maxWidth="100%"
    sx={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <Logo style={{ marginBottom: 50, transform: "scale(1.5)" }} />
    <LogInForm />
  </Container>;
}

export default LogIn;
