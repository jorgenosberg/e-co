import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import PasswordField from "./PasswordField";
import Button from "@mui/material/Button";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Avatar from "@mui/material/Avatar";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function LogInForm() {
  return (
    <Container
      sx={{
        width: "75%",
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
          <Avatar fontSize="large" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            variant="outlined"
            id="username-field"
            name="Username"
            label="Username"
            type="email"
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
          <PasswordField />
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
          <Link to="/home">
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/home"
            >
              Log In
            </Button>
          </Link>
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
          <Typography display="inline">Don't have an account?</Typography>
          <Typography component={Link} to="/sign-up">
            <Link to="/sign-up">Sign Up</Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LogInForm;
