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
import ConfirmPasswordField from "../components/ConfirmPasswordField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PhoneIcon from "@mui/icons-material/Phone";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import SaveIcon from "@mui/icons-material/Save";
import Snackbar from "@mui/material/Snackbar";
import ThemeSwitch from "../components/ThemeSwitch";
import PaletteIcon from "@mui/icons-material/Palette";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";

const regionMenuOptions = [
  { code: "EU", name: "Europe", currency: "EUR" },
  { code: "US", name: "United States", currency: "USD" },
  { code: "CA", name: "Canada", currency: "CAD" }
];

function Account() {
  const [email, setEmail] = React.useState("abc@gmail.com");
  const [phone, setPhone] = React.useState("6 34 81 93 20");
  const [country, setCountry] = React.useState({
    code: "FR",
    label: "France",
    phone: "33",
    suggested: true
  });
  const [region, setRegion] = React.useState("");

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Container
    sx={{
      width: "75%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
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
                alignItems: "center"
              }}
            >
              <PaletteIcon fontSize="large" sx={{ color: "primary" }} />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <Typography variant="h5" align="center" fontWeight="bold">
                Customization
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                Default color theme (currently disabled):
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <ThemeSwitch />
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
                alignItems: "center"
              }}
            >
              <AccountCircleIcon fontSize="large" sx={{ color: "primary" }} />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <Typography variant="h5" align="center" fontWeight="bold">
                Account Settings
              </Typography>
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
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">Change password</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <PasswordField />
            </Grid>
            <Grid item xs={12} md={6}>
              <ConfirmPasswordField />
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
                onChange={(e) => setPhone(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  )
                }}
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
                startIcon={<SaveIcon />}
                onClick={handleClick}
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
