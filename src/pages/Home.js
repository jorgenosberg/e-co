import * as React from "react";
import { faker } from "@faker-js/faker";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

function Home() {
  const [open, setOpen] = React.useState(false);
  const [anchorElHelp, setAnchorElHelp] = React.useState(null);
  const handleOpenHelpMenu = (event) => {
    setAnchorElHelp(event.currentTarget);
  };

  function randomNumberGenerator() {
    return faker.datatype.float({ min: 200, max: 600, precision: 0.01 });
  }
  function randomNumberGenerator2() {
    return faker.datatype.float({ min: 10, max: 70, precision: 0.01 });
  }
  const d = randomNumberGenerator();
  const a = Number(d);
  const c = randomNumberGenerator2();
  const b = Number(c);
  const [num] = React.useState(a);
  const [num1] = React.useState(b);
  return (
    <Container>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sx={{ textAlign: "left" }}>
          <Typography variant="h1" display="inline" sx={{ fontWeight: "400" }}>
            Welcome to E
            <Typography
              variant="h1"
              display="inline"
              color="secondary.main"
              sx={{ fontWeight: "400" }}
            >
              -
            </Typography>
            Co
            <Typography
              variant="h1"
              display="inline"
              color="secondary.main"
              sx={{ fontWeight: "400" }}
            >
              .
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "left" }}>
          <Typography variant="h4">
            The current price of electricity is: <Box display="inline" sx={{ px: 1, borderRadius: 2, backgroundColor: "secondary.light" }}>{num}</Box> €/MWh{" "}
            <Tooltip
              title="This represents the price of electricity at the moment in
                      Europe for a MWh (average yearly consumption in OECD
                      around 8MWh)"
              placement="right-start"
            >
              <IconButton sx={{ p: 0 }}>
                <HelpOutlineIcon
                  sx={{ color: "secondary.main" }}
                  fontSize="large"
                />
              </IconButton>
            </Tooltip>
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "left" }}>
          <Typography variant="h4">
            The current CO2 emissions is: <Box display="inline" sx={{ px: 1, borderRadius: 2, backgroundColor: "secondary.light" }}>{num1}</Box> g/kWh{" "}
            <Tooltip
              title="This represents how much CO2eq (CO2 equivalent) is
                      produced by electrical production in this place
                      (perspective 800g of bread produces roughly 1kg CO2eq)"
              placement="right-start"
            >
              <IconButton sx={{ p: 0 }}>
                <HelpOutlineIcon
                  sx={{ color: "secondary.main" }}
                  fontSize="large"
                />
              </IconButton>
            </Tooltip>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
