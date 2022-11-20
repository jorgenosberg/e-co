import * as React from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import SaveIcon from "@mui/icons-material/Save";
import Snackbar from "@mui/material/Snackbar";
import ThemeSwitch from "../components/ThemeSwitch";

function Settings() {
  const [type, setType] = React.useState("price");
  const [comparator, setComparator] = React.useState("below");

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
    <Box>
      <Typography variant="h5" fontWeight="bold">
        Notification Settings
      </Typography>
      <Divider />
      <Typography variant="h6" fontWeight="bold" mt={2}>
        Mode
      </Typography>
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label="E-mail notifications" />
        <FormControlLabel control={<Checkbox />} label="SMS notifications" />
      </FormGroup>
      <Typography variant="h6" fontWeight="bold" mt={2}>
        Frequency
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography>Alert on event: when</Typography>
        <Select
          sx={{ m: 1, minWidth: 120 }}
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value={"price"}>price</MenuItem>
          <MenuItem value={"CO2 emissions"}>
            CO<sub>2</sub> emissions
          </MenuItem>
        </Select>
        <Typography>is</Typography>
        <Select
          sx={{ m: 1, minWidth: 120 }}
          id="comparator"
          value={comparator}
          onChange={(e) => setComparator(e.target.value)}
        >
          <MenuItem value={"below"}>below</MenuItem>
          <MenuItem value={"above"}>above</MenuItem>
          <MenuItem value={"equal to"}>equal to</MenuItem>
        </Select>
        <TextField
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {type === "price" ? (
                  "€/MWh"
                ) : (
                  <Typography>
                    CO<sub>2</sub> eq/KWh
                  </Typography>
                )}
              </InputAdornment>
            )
          }}
        />
      </Stack>
      <br />
      <Button
        variant="contained"
        startIcon={<SaveIcon />}
        onClick={handleClick}
      >
        Save
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Settings updated successfully
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Settings;
