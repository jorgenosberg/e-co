import * as React from "react";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import CountrySelector from "../components/CountrySelector";
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
import MenuItem from "@mui/material/MenuItem";
import { auth, db } from "../api/firebase";
import { updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { onValue, ref, update } from "firebase/database";
import { UserContext } from "../App";

const regionMenuOptions = [
  { code: "EU", name: "Europe", currency: "EUR" },
  { code: "US", name: "United States", currency: "USD" },
  { code: "CA", name: "Canada", currency: "CAD" },
];

function Account(props) {
  const user = React.useContext(UserContext);
  const [email, setEmail] = React.useState("");
  const [phone, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [country, setCountry] = React.useState({
    code: "FR",
    label: "France",
    phone: "33",
    suggested: true,
  });
  const [region, setRegion] = React.useState("");
  const [message, setMessage] = React.useState({});

  React.useEffect(() => {
    onValue(ref(db, `users/${user.uid}`), snapshot => {
      const data = snapshot.val();
      if (data) {
        setEmail(data.email);
        setPhoneNumber(data.phoneNumber);
        setCountry(data.country);
      }
    })
  }, [])

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };
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
        await updateEmail(auth.currentUser, email);
      update(ref(db, `users/${user.uid}`), { email: email, country: country, phoneNumber: phone });
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
                  Default color theme (currently disabled):
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel control={<Switch defaultChecked={props.theme.palette.mode === "light"} onChange={props.colorMode.toggleColorMode} />} label={props.theme.palette.mode === "dark" ? "Dark mode" : "Default theme"} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Preferred region and currency:
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Select value={region} onChange={handleRegionChange}>
                    {regionMenuOptions.map((option) => (
                      <MenuItem key={option.code} value={option.name}>
                        <Grid container>
                          <Box sx={{ mr: 1 }}>
                            <img
                              loading="lazy"
                              width="20"
                              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                              alt="Selected region flag"
                            />
                          </Box>
                          <Typography textAlign="center">
                            {option.currency}
                          </Typography>
                        </Grid>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
              <Grid item xs={12}>
                <Typography variant="body2">Change password</Typography>
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
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    Profile updated successfully
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
