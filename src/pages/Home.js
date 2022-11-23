import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InsertQuestionOutline from "@mui/icons-material/HelpOutline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import IconButton from "@mui/material/IconButton";
import { QuestionMarkOutlined } from "@mui/icons-material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

function Home() {
  const [open, setOpen] = React.useState(false);
  const [anchorElHelp, setAnchorElHelp] = React.useState(null);
  const handleOpenHelpMenu = (event) => {
    setAnchorElHelp(event.currentTarget);
  };
  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  const [isShown, setIsShown] = useState(false);
  const [isShown2, setIsShown2] = useState(false);
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
  const [num] = useState(a);
  const [num1] = useState(b);
  return (
    <Container>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sx={{ textAlign: "left", mb: 30 }}>
          <div
            style={{
              fontSize: "10px",
              padding: "20px",
              color: "black"
            }}
          >
            <Typography variant="h5">
              <h1>Welcome to E-Co!</h1>
              <h2>
                {" "}
                The current price of electricity is: {num} €/MWh{" "}
                <Tooltip
                  title="This represents the price of electricity at the moment in
                      Europe for a MWh (average yearly consumption in OECD
                      around 8MWh)"
                >
                  <IconButton onClick={handleOpenHelpMenu} sx={{ p: 0 }}>
                    <HelpOutlineIcon
                      sx={{ color: "primary" }}
                      fontSize="large"
                    />
                  </IconButton>
                </Tooltip>
              </h2>
              <h2>
                {" "}
                The current CO2 emissions is: {num1} g/kWh{" "}
                <Tooltip
                  title="This represents how much CO2eq (CO2 equivalent) is
                      produced by electrical production in this place
                      (perspective 800g of bread produces roughly 1kg CO2eq)"
                >
                  <IconButton onClick={handleOpenHelpMenu} sx={{ p: 0 }}>
                    <HelpOutlineIcon
                      sx={{ color: "primary" }}
                      fontSize="large"
                    />
                  </IconButton>
                </Tooltip>
              </h2>
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
