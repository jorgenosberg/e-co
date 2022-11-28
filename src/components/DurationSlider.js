import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import TextField from "@mui/material/TextField";

function DurationSlider(props) {
  
  function valueLabelFormat(value) {
    if (props.timeUnit === "hours") {
      return value <= 1 ? `${value} hour` : `${value} hours`;
    } else {
      return value <= 1 ? `${value} minute` : `${value} minutes`;
    }
  }

  const handleSliderChange = (event, newValue) => {
    props.setDurationValue(newValue);
  };

  const handleInputChange = (event) => {
    props.setDurationValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography id="input-slider" gutterBottom>
        Duration
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={1}>
          <AccessTimeFilledIcon sx={{ color: "primary" }} />
        </Grid>
        <Grid item xs={9} sx={{pr: 1}}>
          <Slider
            value={typeof props.durationValue === "number" ? props.durationValue : 0}
            onChange={handleSliderChange}
            defaultValue={1}
            valueLabelFormat={valueLabelFormat}
            valueLabelDisplay="auto"
            step={props.timeUnit === "hours" ? 0.5 : 1}
            marks={props.timeUnit === "hours" ?
              [
              {
                value: 0,
                label: "0h"
              },
              {
                value: 12,
                label: "12hrs"
              },
              {
                value: 24,
                label: "24hrs"
              }
            ] :
            [
              {
                value: 0,
                label: "0min"
              },
              {
                value: 30,
                label: "30min"
              },
              {
                value: 60,
                label: "60min"
              }
            ]
          }
            min={0}
            max={props.timeUnit === "hours" ? 24 : 60}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            variant="outlined"
            value={props.durationValue}
            size="small"
            onChange={handleInputChange}
            inputProps={props.timeUnit === "hours" ? {
              step: 0.5,
              min: 0,
              max: 24,
              type: "number",
            } : {
              step: 1,
              min: 0,
              max: 60,
              type: "number",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default DurationSlider;
