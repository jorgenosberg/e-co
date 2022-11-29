import * as React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CalculatorTool from "../components/CalculatorTool";
import CalculateIcon from "@mui/icons-material/Calculate";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";

function Calculator() {
  return (
    <Container>
      <Paper elevation={6} sx={{py: 10, borderRadius: 10}}>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
          <Avatar><CalculateIcon /></Avatar>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="h4">Calculator</Typography>
        </Grid>
        <Grid item xs={12}>
          <CalculatorTool />
        </Grid>
      </Grid>
      </Paper>
    </Container>
  );
}

export default Calculator;
