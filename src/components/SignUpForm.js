import * as React from "react";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CountrySelector from "./CountrySelector";
import PasswordField from "./PasswordField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PhoneIcon from "@mui/icons-material/Phone";
import Avatar from "@mui/material/Avatar";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import {Link as NavLink} from 'react-router-dom'
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from 'react-router-dom';
import { createUser } from "../api/auth";

function SignUpForm() {
  let navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [country, setCountry] = React.useState(null);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [message, setMessage] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleError = () => {
    setOpen(true);
    setMessage({ type: "error", text: "Passwords do not match" })
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };


  const signUp = async () => {
    if (password !== confirmPassword) {
      handleError();
    } else {
      try {
        await createUser(email, password, country, phoneNumber);
        setMessage({ type: "success", text: "Account created successfully" });
        setTimeout(() => navigate("/home"), 2000);
      } catch {
        setMessage({ type: "error", text: "Error creating account" })
      }

    }
  };

  return (
    <Container
      sx={{
        width: "35%",
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
          <Avatar sx={{width:"70px", height:"70px"}} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            variant="outlined"
            id="Email-field"
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
        <Grid item xs={12} md={6}>
          <PasswordField label={"Password"} password={password} setPassword={setPassword} />
        </Grid>
        <Grid item xs={12} md={6}>
          <PasswordField label={"Confirm password"} password={confirmPassword} setPassword={setConfirmPassword} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CountrySelector value={country} setValue={setCountry} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            variant="outlined"
            id="phone-field-body"
            name="Phone number"
            label="Phone number"
            type="phone"
            sx={{ width: "100%" }}
            onChange={e => setPhoneNumber(e.target.value)}
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
            control={<Checkbox
              checked={checked}
              onChange={handleChange} />}
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
          <Button
            variant="contained"
            size="large"
            onClick={signUp}
            disabled={!checked}
          >
            Sign Up
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
          <Typography>
            Already have an account?{" "}<Link to="/login" component={NavLink}>Log In</Link>
          </Typography>
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={message.type}
          sx={{ width: "100%" }}
        >
          {message.text}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default SignUpForm;
