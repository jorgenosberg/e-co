import * as React from "react";
import SignUpForm from "../components/SignUpForm";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as LogoDark } from "../assets/logo-dark.svg";

function SignUp({colorMode, theme}) {
  return (
    <Container
      maxWidth="100%"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        
        backgroundImage:
          theme.palette.mode === "light"
            ? "radial-gradient(circle, #f4bf37, #f7be3f, #f9bd47, #fbbd4f, #fdbc56, #fcb95e, #fab666, #f8b36e, #f0ad78, #e7a982, #dba58a, #cda291)"
            : "radial-gradient(circle, #928f8f, #827f7f, #727070, #636161, #545353, #484747, #3d3c3c, #323131, #272626, #1c1c1c, #111111, #000000)",

            // ALTERNATIVE "SUN" STYLE GRADIENT
            // : "radial-gradient(circle, #f4bf37, #ebb72f, #e1af27, #d8a71e, #cf9f13, #c1900e, #b3820a, #a57406, #8e5d08, #754808, #5d3407, #442200)",
      }}
    >
      <IconButton onClick={colorMode.toggleColorMode} sx={{position: "fixed", right: 0, top: 0, mt: 2, mr: 4, "&:hover": { color: "secondary.main" }}}>{theme.palette.mode === "light" ? <Brightness4Icon sx={{fontSize: 35}}/> : <Brightness7Icon sx={{fontSize: 35}}/>}</IconButton>
      <Paper
        elevation={10}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          width: "45%",
          p: 10,
          borderRadius: 10,
        }}
      >
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sx={{ mb: 5, textAlign: "center" }}>
            {theme.palette.mode === "light" ? <Logo style={{ transform: "scale(1.5)" }} /> : <LogoDark style={{ transform: "scale(1.5)" }} />}
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <SignUpForm />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default SignUp;
