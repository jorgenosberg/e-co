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
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import StartIcon from "@mui/icons-material/Start";
import ShowerIcon from "@mui/icons-material/Shower";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import MicrowaveIcon from "@mui/icons-material/Microwave";
import axios from "axios";

const averageKwhPerHour = {
  "Washing machine": { 30: 1.9, 40: 2.3, 60: 6.3, 90: 8.0 },
  Dryer: { Low: 2.5, Medium: 3.25, High: 4.0 },
  "Electric car": { "Wall charger": 1.32, Normal: 31.88, Fast: 48.52 },
  Shower: { Cold: 21.0, Normal: 37.0, Hot: 41.0 },
};

const defaultValues = {
  "Washing machine": 40,
  "Dryer": "Medium",
  "Electric car": "Normal",
  "Shower": "Normal",
  "Heating": 20,
  "Oven": 180
}

function CalculatorTool(props) {
  const [task, setTask] = React.useState("");
  const [optionValue, setOptionValue] = React.useState(null);
  const [showOptions, setShowOptions] = React.useState(false);
  const [heatingSliderValue, setHeatingSliderValue] = React.useState(20);
  const [cookingSliderValue, setCookingSliderValue] = React.useState(180);
  const [type, setType] = React.useState("price");
  const [durationValue, setDurationValue] = React.useState(1);
  const [calculatedValue, setCalculatedValue] = React.useState("");

  React.useEffect(() => {
    setOptionValue(defaultValues[task])
  }, [task])

  const calculate = async () => {
    let today = new Date();

    if (today.getHours() < 8) {
      today.setDate(today.getDate() - 1);
      today.setHours(23);
    }

    let todayFormatted = today.toLocaleDateString("en-CA");
    let currentHour = today.getHours();
    let apiUrl = `https://api.iea.org/rte/price/hourly/${props.user.statsRegion.code3}/timeseries?from=${todayFormatted}&to=${todayFormatted}&currency=local`;

    const apiData = await axios.get(apiUrl);
    const pricePerMWh = apiData.data[currentHour].Value;
    const pricePerKWh = pricePerMWh / 1000;

    if (type === "co2") {
      setCalculatedValue(
        (pricePerMWh / (Math.floor(Math.random() * (60 - 47)) + 47)).toFixed(2)
      );
    } else {
      if (["Washing machine", "Dryer", "Electric car"].includes(task)) {
        setCalculatedValue(
          (
            (averageKwhPerHour[task][optionValue] || defaultValues[task]) *
            pricePerKWh *
            durationValue
          ).toFixed(2)
        );
      } else {
        if (task === "Shower") {
          // shower = assume 4.18 kJ per L of water for each degree difference between shower temperature and 10 degrees Celsius
          // 15L per minute, so 5 minute 38 degree shower = 75L. So 75L * 117 kJ/L * 28 degrees difference = 9MJ = 2.5kWh.
          let degreeDifference = averageKwhPerHour[task][optionValue] - 10;
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
          let result =
            cookingSliderValue * 0.0125 * durationValue * pricePerKWh;
          setCalculatedValue(result.toFixed(2));
        } else if (task === "Heating") {
          // heating = assume range of 1kWh to 2.5kWh. Target temperature of 20 degrees Celsius equals 1.2 kWh.
          // kWh from target temperature = target temperature * 0.06
          let result = heatingSliderValue * 0.06 * durationValue * pricePerKWh;
          setCalculatedValue(result.toFixed(2));
        }
      }
    }
  };

  const handleTypeChange = (event, newValue) => setType(newValue);
  const displayOptions = () => setShowOptions(true);
  const handleChange = (event) => {
    setTask(event.target.value);
    displayOptions();
  };
  const resetCalculator = () => {
    setTask("");
    setOptionValue(null);
    setShowOptions(false);
    setCalculatedValue("");
  };

  const generateOptions = () => {
    if (task === "Washing machine") {
      return (
        <Grid item xs={12}>
          <FormControl>
            <Typography>Laundry temperature</Typography>
            <RadioGroup
              row
              name="row-radio-buttons-laundry"
              defaultValue={40}
              onChange={(event) => setOptionValue(event.target.value)}
            >
              <Box display="flex" justifyContent="center" alignItems="center">
                <LocalLaundryServiceIcon sx={{ color: "secondary", mr: 3 }} />
              </Box>
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
              name="row-radio-buttons-dryer"
              defaultValue="Medium"
              onChange={(event) => setOptionValue(event.target.value)}
            >
              <Box display="flex" justifyContent="center" alignItems="center">
                <LocalLaundryServiceIcon sx={{ color: "secondary", mr: 3 }} />
              </Box>
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
              name="row-radio-buttons-electric-car"
              defaultValue="Normal"
              onChange={(event) => setOptionValue(event.target.value)}
            >
              <Box display="flex" justifyContent="center" alignItems="center">
                <ElectricCarIcon sx={{ color: "secondary", mr: 3 }} />
              </Box>
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
          <FormControl>
            <Typography>Shower temperature</Typography>
            <RadioGroup
              row
              name="row-radio-buttons-shower"
              defaultValue="Normal"
              onChange={(event) => setOptionValue(event.target.value)}
            >
              <Box display="flex" justifyContent="center" alignItems="center">
                <ShowerIcon sx={{ color: "secondary", mr: 3 }} />
              </Box>
              <FormControlLabel
                value="Cold"
                control={<Radio />}
                label="Cold (21°C)"
              />
              <FormControlLabel
                value="Normal"
                control={<Radio />}
                label="Normal (37°C)"
              />
              <FormControlLabel
                value="Hot"
                control={<Radio />}
                label="Hot (41°C)"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      );
    }
    if (task === "Heating") {
      return (
        <Grid item xs={12}>
          <Typography>Target temperature</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ThermostatIcon sx={{ color: "secondary", mr: 3 }} />
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
          </Box>
        </Grid>
      );
    }
    if (task === "Oven") {
      return (
        <Grid item xs={12}>
          <Typography>Cooking temperature</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MicrowaveIcon sx={{ color: "secondary", mr: 3 }} />
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
          </Box>
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
      <Grid container spacing={1} justifyContent="center" alignItems="center">
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
        <Grid item xs={1}>
          <Box display="flex" justifyContent="left" alignItems="left">
            <TaskIcon sx={{ color: "secondary" }} />
          </Box>
        </Grid>
        <Grid item xs={11}>
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
              defaultValue="price"
              onChange={handleTypeChange}
            >
              <Box display="flex" justifyContent="center" alignItems="center">
                <FunctionsIcon sx={{ color: "secondary", mr: 3 }} />
              </Box>
              <FormControlLabel
                value="price"
                control={<Radio />}
                label="Price"
              />
              <FormControlLabel
                value="co2"
                control={<Radio />}
                label="CO2 emissions"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "space-around",
          }}
        >
          <Button
            variant="contained"
            onClick={resetCalculator}
            endIcon={<DeleteOutlinedIcon />}
            sx={{ mx: 1 }}
          >
            RESET
          </Button>
          <Button
            variant="contained"
            onClick={calculate}
            endIcon={<StartIcon />}
            sx={{ mx: 1 }}
          >
            CALCULATE
          </Button>
          <TextField
            focused={calculatedValue === "" ? false : true}
            id="outlined-read-only-input"
            label="Result"
            value={calculatedValue}
            sx={{ mx: 1 }}
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
