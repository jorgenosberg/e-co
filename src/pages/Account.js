import * as React from "react";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CountrySelector, { phoneCountries, regionMenuOptions } from "../components/CountrySelector";
import PasswordField from "../components/PasswordField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PhoneIcon from "@mui/icons-material/Phone";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import SaveIcon from "@mui/icons-material/Save";
import Snackbar from "@mui/material/Snackbar";
import Switch from "@mui/material/Switch";
import FormControlLabel from '@mui/material/FormControlLabel';
import PaletteIcon from "@mui/icons-material/Palette";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { db } from "../api/firebase";
import { updateEmail, updatePassword, } from "firebase/auth";
import { ref, update } from "firebase/database";
import { UserContext } from "../App";

function Account(props) {
  const user = React.useContext(UserContext);
  const [email, setEmail] = React.useState(props.user.email);
  const [phone, setPhoneNumber] = React.useState(props.user.phoneNumber);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [country, setCountry] = React.useState(props.user.country || {
    code: "FR",
    label: "France",
    phone: "33",
    suggested: true,
  });
  const [region, setRegion] = React.useState(props.user.statsRegion || { code: "FR", code3: "FRA", label: "France" });
  const [message, setMessage] = React.useState({});

  const [open, setOpen] = React.useState(false);

  const handleSuccess = () => {
    setOpen(true);
    setMessage({ type: "success", text: "Profile updated successfully" })
  };

  const handleError = (message) => {
    setOpen(true);
    setMessage({ type: "error", text: message })
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const updateUser = async () => {
    try {
      if (password && confirmPassword) {
        if (password === confirmPassword) {
          await updatePassword(user, password);
          setPassword(""); setConfirmPassword("");
        }
        else {
          handleError("Passwords do not match");
          return;
        }
      }

      if (email !== user.email)
        await updateEmail(user, email);
      update(ref(db, `users/${user.uid}`), { email: email, country: country, phoneNumber: phone, statsRegion: region });
      handleSuccess();
    } catch (error) {
      console.error(error)
      handleError("Error in updating profile");
    }
  }


  return (
    <Container
      sx={{
        width: "75%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Container>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar>
                  <PaletteIcon />
                </Avatar>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" align="center" fontWeight="bold">
                  Customization
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Default color theme:
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel control={<Switch defaultChecked={props.theme.palette.mode === "light"} onChange={props.colorMode.toggleColorMode} />} label={props.theme.palette.mode === "dark" ? "Dark mode" : "Default mode"} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Preferred country:
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <CountrySelector value={region} setValue={setRegion} countries={regionMenuOptions} boxLabel="Country" />
              </Grid>
            </Grid>
          </Container>
        </Grid>
        <Grid item xs={6}>
          <Container>
            <Grid container spacing={2} justifyContent="">
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar>
                  <ManageAccountsIcon />
                </Avatar>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" align="center" fontWeight="bold">
                  Account Settings
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  variant="outlined"
                  id="email-field"
                  name="Email"
                  label="Email"
                  type="email"
                  sx={{ width: "100%" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountBoxIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CountrySelector value={country} setValue={setCountry} countries={phoneCountries} boxLabel="Country code" />
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
                  value={phone}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Change password</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <PasswordField label={"Password"} password={password} setPassword={setPassword} />
              </Grid>
              <Grid item xs={12} md={6}>
                <PasswordField label={"Confirm password"} password={confirmPassword} setPassword={setConfirmPassword} />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={updateUser}
                >
                  Save
                </Button>
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
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
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Account;
