import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import TextField from "@mui/material/TextField";

function valuetext(value) {
  return value <= 1 ? `${value} hour` : `${value} hours`;
}

function valueLabelFormat(value) {
  return value <= 1 ? `${value} hour` : `${value} hours`;
}

function DurationSlider() {
  const [value, setValue] = React.useState(1);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography id="input-slider" gutterBottom>
        Duration
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={1}>
          <AccessTimeFilledIcon sx={{ color: "gray" }} />
        </Grid>
        <Grid item xs={7.5} sx={{ mr: 1 }}>
          <Slider
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-label="Duration"
            defaultValue={1}
            valueLabelFormat={valueLabelFormat}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={0.5}
            marks={[
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
            ]}
            min={0}
            max={24}
          />
        </Grid>
        <Grid item xs={3.25}>
          <TextField
            variant="outlined"
            value={value}
            size="small"
            onChange={handleInputChange}
            inputProps={{
              step: 0.5,
              min: 0,
              max: 24,
              type: "number",
              "aria-labelledby": "input-slider"
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default DurationSlider;
