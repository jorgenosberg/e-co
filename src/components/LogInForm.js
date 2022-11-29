import * as React from "react";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import PasswordField from "./PasswordField";
import Button from "@mui/material/Button";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Avatar from "@mui/material/Avatar";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import { Link as NavLink } from 'react-router-dom'
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";
import { signIn } from "../api/auth";

function LogInForm() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const logIn = async () => {
    try {
      await signIn(email, password);
      navigate("/");
    } catch (error) {
      setOpen(true);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };


  return (
    <Container
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 3
          }}
        >
          <Avatar sx={{ width: "70px", height: "70px" }} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            variant="outlined"
            id="email-field"
            name="Email"
            label="Email"
            type="email"
            onChange={e => setEmail(e.target.value)}
            sx={{ width: "100%" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountBoxIcon />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <PasswordField label={"Password"} password={password} setPassword={setPassword} />
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={logIn}
          >
            Log In
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Typography>Don't have an account?{" "}<Link to="/signup" component={NavLink}>Sign Up</Link></Typography>
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Invalid credentials. Please check your username and password.
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default LogInForm;
