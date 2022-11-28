import * as React from "react";
import SignUpForm from "../components/SignUpForm";
import Container from "@mui/material/Container";
import { ReactComponent as Logo } from "../assets/logo.svg";

function SignUp() {
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
    <SignUpForm />
  </Container>;
}

export default SignUp;
