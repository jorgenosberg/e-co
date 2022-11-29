import * as React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CalculatorTool from "../components/CalculatorTool";
import CalculateIcon from "@mui/icons-material/Calculate";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";

function Calculator() {
  return (
    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "space-around"}}>
      <Paper elevation={10} sx={{ width: "60%", height: "80%", py:10, borderRadius: 10 }}>
        <Grid container spacing={2} sx={{justifyContent: "center", alignItems: "center"}}>
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
      <Paper elevation={10} sx={{ width: "35%", height: "80%", py:10, borderRadius: 10 }}></Paper>
    </Box>
  );
}

export default Calculator;
