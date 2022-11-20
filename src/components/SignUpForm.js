import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CountrySelector from "./CountrySelector";
import PasswordField from "./PasswordField";
import ConfirmPasswordField from "./ConfirmPasswordField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PhoneIcon from "@mui/icons-material/Phone";
import Avatar from "@mui/material/Avatar";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function SignUpForm() {
  const [country, setCountry] = React.useState(null);
  return (
    <Container
      sx={{
        width: "50%",
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
        <Grid item xs={12} md={6}>
          <PasswordField />
        </Grid>
        <Grid item xs={12} md={6}>
          <ConfirmPasswordField />
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <CountrySelector value={country} setValue={setCountry} />
        </Grid>
        <Grid item xs={12} md={7}>
          <TextField
            required
            variant="outlined"
            id="phone-field-body"
            name="Phone number"
            label="Phone number"
            type="phone"
            sx={{ width: "100%" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox />}
            label={
              <Typography variant="body2">
                I agree to the <Link>Terms of Use</Link> &{" "}
                <Link>Privacy Policy</Link>
              </Typography>
            }
          />
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
              Sign Up
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
          <Typography>
            Already have an account? <Link to="/log-in">Log in</Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignUpForm;
