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

import { faker } from "@faker-js/faker";

function CalculatorTool() {
  const [task, setTask] = React.useState("");
  const [showOptions, setShowOptions] = React.useState(false);
  const [sliderValue, setSliderValue] = React.useState(20);
  const [showerSliderValue, setShowerSliderValue] = React.useState(38);
  const [cookingSliderValue, setCookingSliderValue] = React.useState(180);
  const [type, setType] = React.useState("price");
  const [calculatedValue, setCalculatedValue] = React.useState(null);

  const calculate = () => {
    setCalculatedValue(
      faker.datatype.number({ min: 60, max: 780, precision: 0.01 })
    );
  };
  const handleTypeChange = (event, newValue) => {
    setType(newValue);
  };
  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };
  const handleShowerSliderChange = (event, newValue) => {
    setShowerSliderValue(newValue);
  };
  const handleCookingSliderChange = (event, newValue) => {
    setCookingSliderValue(newValue);
  };
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
            onChange={handleShowerSliderChange}
            aria-label="Average shower temperature"
            defaultValue={38}
            valueLabelFormat={showerSliderValue + "℃"}
            valueLabelDisplay="auto"
            step={1}
            marks={[
              {
                value: 35,
                label: "35°C"
              },
              {
                value: 39,
                label: "39°C"
              },
              {
                value: 45,
                label: "45°C"
              }
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
            value={sliderValue}
            onChange={handleSliderChange}
            aria-label="Target temperature"
            defaultValue={20}
            valueLabelFormat={sliderValue + "℃"}
            valueLabelDisplay="auto"
            step={1}
            marks={[
              {
                value: 10,
                label: "10°C"
              },
              {
                value: 20,
                label: "20°C"
              },
              {
                value: 30,
                label: "30°C"
              }
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
            onChange={handleCookingSliderChange}
            aria-label="Cooking temperature"
            defaultValue={180}
            valueLabelFormat={cookingSliderValue + "℃"}
            valueLabelDisplay="auto"
            step={10}
            marks={[
              {
                value: 80,
                label: "80°C"
              },
              {
                value: 180,
                label: "180°C"
              },
              {
                value: 220,
                label: "220°C"
              },
              {
                value: 250,
                label: "250°C"
              }
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
        alignItems: "center"
      }}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Typography>
            Task
            <Tooltip title="Choose which task you are doing in order to help us find your answer">
              <IconButton sx={{ p: 0, ml: 0.5, mb: 0.5 }}>
                <HelpOutlineIcon sx={{ color: "primary" }} fontSize="medium" />
              </IconButton>
            </Tooltip>
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Box display="flex" justifyContent="center" alignItems="center">
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
          <DurationSlider />
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <Typography>
              Type
              <Tooltip title="Select what you want to calculate">
                <IconButton sx={{ p: 0, ml: 0.5, mb: 0.5 }}>
                  <HelpOutlineIcon
                    sx={{ color: "primary" }}
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
                    <Typography>€/kWh</Typography>
                  ) : (
                    <Typography>
                      CO<sub>2</sub> eq/kWh
                    </Typography>
                  )}
                </InputAdornment>
              )
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CalculatorTool;
