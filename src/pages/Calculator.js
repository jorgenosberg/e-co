import * as React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CalculatorTool from "../components/CalculatorTool";
import CalculateIcon from "@mui/icons-material/Calculate";

function Calculator() {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <CalculateIcon fontSize="large" />
          <Typography variant="h4">Calculator</Typography>
        </Grid>
        <Grid item xs={12}>
          <CalculatorTool />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Calculator;
