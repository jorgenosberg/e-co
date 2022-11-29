import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CalculatorTool from "../components/CalculatorTool";
import CalculateIcon from "@mui/icons-material/Calculate";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";

function Calculator() {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Grid item xs={6} md={6}>
        <Paper
          elevation={10}
          sx={{ py: 10, borderRadius: 10 }}
        >
          <Grid
            container
            spacing={2}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Avatar
                sx={{
                  width: "70px",
                  height: "70px",
                  backgroundColor: "secondary.main",
                }}
              >
                <CalculateIcon sx={{ fontSize: "45px" }} />
              </Avatar>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Typography variant="h4">Calculator</Typography>
            </Grid>
            <Grid item xs={12}>
              <CalculatorTool />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Paper
          elevation={10}
          sx={{ py: 10, borderRadius: 10 }}
        >
          <Grid
            container
            spacing={2}
            sx={{ justifyContent: "center", alignItems: "center", px: 4 }}
          >
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Avatar
                sx={{
                  width: "70px",
                  height: "70px",
                  backgroundColor: "secondary.main",
                }}
              >
                <HelpCenterIcon sx={{ fontSize: "45px" }} />
              </Avatar>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Typography variant="h4">How do we calculate this?</Typography>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Typography variant="h6">Real-time data</Typography>
              <Typography variant="body">
                Whenever you press{" "}
                <Box
                  display="inline"
                  sx={{
                    backgroundColor: "primary.main",
                    borderRadius: 1,
                    py: 0.25,
                    px: 0.5,
                    color: "primary.contrastText",
                  }}
                >
                  calculate
                </Box>{" "}
                in the calculator tool to the left, we fetch real-time data on
                electricity prices and the distribution of energy sources in the
                power grid in your selected country. The data is updated every
                hour.
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Typography variant="h6">Average power consumption</Typography>
              <Typography variant="body">
                To estimate the cost or{" "}
                <Box
                  display="inline"
                  sx={{
                    backgroundColor: "divider",
                    borderRadius: 1,
                    py: 0.25,
                    px: 0.5,
                  }}
                >
                  CO<sub>2</sub>
                </Box>{" "}
                emissions related to your chosen activity, we combine the
                real-time data with the most accurate average power consumption of
                the activity per hour (measured in kilowatts per hour, <Box
                  display="inline"
                  sx={{
                    backgroundColor: "divider",
                    borderRadius: 1,
                    py: 0.25,
                    px: 0.5,
                  }}
                >
                  kWh
                </Box>).
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Typography variant="h6">Example – a warm shower</Typography>
              <Typography variant="body">
                The energy required to heat water is <Box
                  display="inline"
                  sx={{
                    backgroundColor: "divider",
                    borderRadius: 1,
                    py: 0.25,
                    px: 0.5,
                  }}
                >
                  4.18kJ/L/°C
                </Box>. Assuming a start temperature of 10°C and an average consumption of <Box
                  display="inline"
                  sx={{
                    backgroundColor: "divider",
                    borderRadius: 1,
                    py: 0.25,
                    px: 0.5,
                  }}
                >
                  15L/min
                </Box>, the total energy required for a five-minute 37°C shower would be equal to <Box
                  display="inline"
                  sx={{
                    backgroundColor: "divider",
                    borderRadius: 1,
                    py: 0.25,
                    px: 0.5,
                  }}
                >
                  113kJ × 75L = 8.5 MJ ≈ 2.4 kWh
                </Box>. The real-time price, given in <Box
                  display="inline"
                  sx={{
                    backgroundColor: "divider",
                    borderRadius: 1,
                    py: 0.25,
                    px: 0.5,
                  }}
                >
                  €/kWh
                </Box> is then used to calculate the total cost of the shower.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Calculator;
