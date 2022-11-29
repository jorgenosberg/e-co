import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/logo.svg";

function PageNotFound() {
  const navigate = useNavigate();

  return (<Box sx={{
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  }}>
    <Paper elevation={10} color="default" sx={{justifyContent: "center", alignItems: "center", width: "50%", borderRadius: 10, py: 5}}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Logo style={{ transform: "scale(1.5)" }} />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center", my:4}}>
            <Typography variant="h2" display="inline" sx={{ fontWeight: 400 }}>
              Oops
              <Typography
                variant="h2"
                display="inline"
                color="secondary.main"
                sx={{ fontWeight: 400 }}
              >
                !
              </Typography>
            </Typography>

            <Typography variant="h2">
              We couldn't find the page <br/>you're looking for<Typography
                variant="h2"
                display="inline"
                color="secondary.main"
                sx={{ fontWeight: 400 }}
              >
                ...
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center"}}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<ArrowCircleLeftOutlinedIcon />}
              onClick={() => navigate(-1)}
            >
              Go back to last page
            </Button>
          </Grid>
        </Grid>
    </Paper>
    </Box>
  );
}

export default PageNotFound;
