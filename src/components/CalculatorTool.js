import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import DurationSlider from "./DurationSlider";
import Slider from "@mui/material/Slider";
import TaskIcon from "@mui/icons-material/Task";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FunctionsIcon from "@mui/icons-material/Functions";
import Tooltip from "@mui/material/Tooltip";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { getAuth } from "firebase/auth";

const averageKwhPerHour = {
  "Washing machine": { 30: 1.9, 40: 2.3, 60: 6.3, 90: 8.0 },
  Dryer: { Low: 2.5, Medium: 3.25, High: 4.0 },
  "Electric car": { "Wall charger": 1.32, Normal: 31.88, Fast: 48.52 },
};

function CalculatorTool() {
  const [task, setTask] = React.useState("");
  const [optionValue, setOptionValue] = React.useState(null);
  const [showOptions, setShowOptions] = React.useState(false);
  const [heatingSliderValue, setHeatingSliderValue] = React.useState(20);
  const [showerSliderValue, setShowerSliderValue] = React.useState(38);
  const [cookingSliderValue, setCookingSliderValue] = React.useState(180);
  const [type, setType] = React.useState("price");
  const [durationValue, setDurationValue] = React.useState(1);
  const [calculatedValue, setCalculatedValue] = React.useState(null);

  const auth = getAuth();
  const user = auth.currentUser;

  const getUserCountry = async () => {
    if (user !== null) {
      const cca2Code = user.country.code;
      const countryData = await axios.get(`https://restcountries.com/v3.1/alpha/${cca2Code}?fields=cca3`);
      return countryData.data.cca3;
    } else {
      return "FRA";
    }
  }

  const calculate = async () => {
    let country = getUserCountry();
    let today = new Date();
    let todayFormatted = today.toLocaleDateString("en-CA");
    let currentHour = today.getHours();
    let apiUrl = `https://api.iea.org/rte/price/hourly/${country}/timeseries?from=${todayFormatted}&to=${todayFormatted}&currency=local`;

    const apiData = await axios.get(apiUrl);
    const pricePerMWh = apiData.data[currentHour].Value;
    const pricePerKWh = pricePerMWh / 1000;

    if (["Washing machine", "Dryer", "Electric car"].includes(task)) {
      setCalculatedValue(
        (
          averageKwhPerHour[task][optionValue] *
          pricePerKWh *
          durationValue
        ).toFixed(2)
      );
    } else {
      if (task === "Shower") {
        // shower = assume 4.18 kJ per L of water for each degree difference between shower temperature and 10 degrees Celsius
        // 15L per minute, so 5 minute 38 degree shower = 75L. So 75L * 117 kJ/L * 28 degrees difference = 9MJ = 2.5kWh.
        let degreeDifference = showerSliderValue - 10;
        let energyPerLiter = 4.18 * degreeDifference;
        let litersForShower = 15 * durationValue;
        let kiloJouleToKiloWattHour = 0.000277778;
        let kilowattForShower =
          litersForShower * energyPerLiter * kiloJouleToKiloWattHour;
        let result = kilowattForShower * pricePerKWh;
        setCalculatedValue(result.toFixed(2));
      } else if (task === "Cooking") {
        // oven = assume range of 1kWh to 3.125kWh. 200 degrees Celsuis equals 2.5 kWh.
        // simple formula to calculate kWh from temperature: temperature * 0.0125.
        let result = cookingSliderValue * 0.0125 * durationValue * pricePerKWh;
        setCalculatedValue(result.toFixed(2));
      } else if (task === "Heating") {
        // heating = assume range of 1kWh to 2.5kWh. Target temperature of 20 degrees Celsius equals 1.2 kWh.
        // kWh from target temperature = target temperature * 0.06
        let result = heatingSliderValue * 0.06 * durationValue * pricePerKWh;
        setCalculatedValue(result.toFixed(2));
      }
    }
  };

  const handleTypeChange = (event, newValue) => setType(newValue);
  const displayOptions = () => setShowOptions(true);
  const handleChange = (event) => {
    setTask(event.target.value);
    displayOptions();
  };

  const generateOptions = () => {
    if (task === "Washing machine") {
      return (
        <Grid item xs={12}>
          <FormControl>
            <Typography>Laundry temperature</Typography>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(event) => setOptionValue(event.target.value)}
            >
              <FormControlLabel value={30} control={<Radio />} label="30℃" />
              <FormControlLabel value={40} control={<Radio />} label="40℃" />
              <FormControlLabel value={60} control={<Radio />} label="60℃" />
              <FormControlLabel value={90} control={<Radio />} label="90℃" />
            </RadioGroup>
          </FormControl>
        </Grid>
      );
    }
    if (task === "Dryer") {
      return (
        <Grid item xs={12}>
          <FormControl>
            <Typography>Dryer temperature</Typography>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(event) => setOptionValue(event.target.value)}
            >
              <FormControlLabel value="Low" control={<Radio />} label="Low" />
              <FormControlLabel
                value="Medium"
                control={<Radio />}
                label="Medium"
              />
              <FormControlLabel value="High" control={<Radio />} label="High" />
            </RadioGroup>
          </FormControl>
        </Grid>
      );
    }
    if (task === "Electric car") {
      return (
        <Grid item xs={12}>
          <FormControl>
            <Typography>Charging mode</Typography>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(event) => setOptionValue(event.target.value)}
            >
              <FormControlLabel
                value="Wall"
                control={<Radio />}
                label="Wall charger"
              />
              <FormControlLabel
                value="Normal"
                control={<Radio />}
                label="Normal"
              />
              <FormControlLabel value="Fast" control={<Radio />} label="Fast" />
            </RadioGroup>
          </FormControl>
        </Grid>
      );
    }
    if (task === "Shower") {
      return (
        <Grid item xs={12}>
          <Typography>Avg. shower temperature</Typography>
          <Slider
            value={showerSliderValue}
            onChange={(event) => setShowerSliderValue(event.target.value)}
            aria-label="Average shower temperature"
            defaultValue={38}
            valueLabelFormat={showerSliderValue + "℃"}
            valueLabelDisplay="auto"
            step={1}
            marks={[
              {
                value: 35,
                label: "35°C",
              },
              {
                value: 39,
                label: "39°C",
              },
              {
                value: 45,
                label: "45°C",
              },
            ]}
            min={35}
            max={45}
          />
        </Grid>
      );
    }
    if (task === "Heating") {
      return (
        <Grid item xs={12}>
          <Typography>Target temperature</Typography>
          <Slider
            value={heatingSliderValue}
            onChange={(event) => setHeatingSliderValue(event.target.value)}
            aria-label="Target temperature"
            defaultValue={20}
            valueLabelFormat={heatingSliderValue + "℃"}
            valueLabelDisplay="auto"
            step={1}
            marks={[
              {
                value: 10,
                label: "10°C",
              },
              {
                value: 20,
                label: "20°C",
              },
              {
                value: 30,
                label: "30°C",
              },
            ]}
            min={10}
            max={30}
          />
        </Grid>
      );
    }
    if (task === "Oven") {
      return (
        <Grid item xs={12}>
          <Typography>Cooking temperature</Typography>
          <Slider
            value={cookingSliderValue}
            onChange={(event) => setCookingSliderValue(event.target.value)}
            aria-label="Cooking temperature"
            defaultValue={180}
            valueLabelFormat={cookingSliderValue + "℃"}
            valueLabelDisplay="auto"
            step={10}
            marks={[
              {
                value: 80,
                label: "80°C",
              },
              {
                value: 180,
                label: "180°C",
              },
              {
                value: 220,
                label: "220°C",
              },
              {
                value: 250,
                label: "250°C",
              },
            ]}
            min={80}
            max={250}
          />
        </Grid>
      );
    }
  };

  return (
    <Container
      sx={{
        width: "75%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Typography>
            Task
            <Tooltip
              title="Choose which task you are doing in order to help us find your answer"
              placement="right"
            >
              <IconButton sx={{ p: 0, ml: 0.5, mb: 0.5 }}>
                <HelpOutlineIcon
                  sx={{ color: "secondary.main" }}
                  fontSize="medium"
                />
              </IconButton>
            </Tooltip>
          </Typography>
        </Grid>
        <Grid item xs={0.5}>
          <Box display="flex" justifyContent="left" alignItems="left">
            <TaskIcon sx={{ color: "secondary" }} />
          </Box>
        </Grid>
        <Grid item xs={11.5}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-helper-label">
              Select task
            </InputLabel>
            <Select
              id="task-select"
              value={task}
              onChange={handleChange}
              label="Select task"
            >
              <MenuItem value={"Washing machine"}>Washing machine</MenuItem>
              <MenuItem value={"Dryer"}>Dryer</MenuItem>
              <MenuItem value={"Electric car"}>Charge electric car</MenuItem>
              <MenuItem value={"Shower"}>Shower</MenuItem>
              <MenuItem value={"Heating"}>Heating</MenuItem>
              <MenuItem value={"Oven"}>Oven</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {showOptions ? generateOptions(task) : null}
        <Grid item xs={12}>
          {task === "Shower" ? (
            <DurationSlider
              setDurationValue={setDurationValue}
              durationValue={durationValue}
              timeUnit={"minutes"}
            />
          ) : (
            <DurationSlider
              setDurationValue={setDurationValue}
              durationValue={durationValue}
              timeUnit={"hours"}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <Typography>
              Type
              <Tooltip
                title="Select what you want to calculate"
                placement="right"
              >
                <IconButton sx={{ p: 0, ml: 0.5, mb: 0.5 }}>
                  <HelpOutlineIcon
                    sx={{ color: "secondary.main" }}
                    fontSize="medium"
                  />
                </IconButton>
              </Tooltip>
            </Typography>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={handleTypeChange}
            >
              <Box display="flex" justifyContent="center" alignItems="center">
                <FunctionsIcon sx={{ color: "secondary", mr: 1 }} />
              </Box>
              <FormControlLabel
                value="price"
                control={<Radio />}
                label="Price"
              />
              <FormControlLabel
                disabled
                value="co2"
                control={<Radio />}
                label="CO2 emissions"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "right" }}>
          <Button variant="contained" onClick={calculate}>
            CALCULATE
          </Button>
        </Grid>
        <Grid item xs={6}>
          <TextField
            focused
            id="outlined-read-only-input"
            label="Result"
            value={calculatedValue}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  {type === "price" ? (
                    <Typography>€</Typography>
                  ) : (
                    <Typography>
                      CO<sub>2</sub> eq
                    </Typography>
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CalculatorTool;
