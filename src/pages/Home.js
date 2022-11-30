import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import BoltIcon from '@mui/icons-material/Bolt';
import Co2Icon from '@mui/icons-material/Co2';
import Avatar from "@mui/material/Avatar";
import Chip from '@mui/material/Chip';
import { fetchDayPrices, fetchSummary } from "../api/stats";
import { ReactComponent as HomeDecoration } from "../assets/home-decoration.svg";
import { faker } from "@faker-js/faker";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';


function Home({ user }) {
  const navigate = useNavigate();
  const [price, setPrice] = React.useState(0);
  const [emissions, setEmissions] = React.useState(randomNumberGenerator().toFixed(2));
  const [avgDaily, setAvgDaily] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetchDayPrices(user.statsRegion.code3);
      let date = new Date();

      if (date.getHours() < 8) {
        date.setDate(date.getDate() - 1);
        date.setHours(23);
      }

      setPrice(response.values[date.getHours()].toFixed(2));
      setEmissions(randomNumberGenerator().toFixed(2));
      setLoading(false);
    })()
  }, [user])

  React.useEffect(() => {
    (async () => {
      const summary = await fetchSummary(user.statsRegion.code3);
      setAvgDaily(summary.AvgDaily);
    })()
  }, [])

  function randomNumberGenerator() {
    return faker.datatype.float({ min: 10, max: 70, precision: 0.01 });
  }

  return (
    <Container>
      <Grid container spacing={2} justifyContent="center" position="relative" zIndex={1}>
        <Grid item xs={12} sx={{ textAlign: "left" }}>
          <Typography variant="h2" display="inline" sx={{ fontWeight: "bold" }}>
            Welcome,{" "}
          </Typography>
          <Box display="inline" style={{ cursor: "pointer" }} onClick={() => navigate("/account")}>
            <Typography
              variant="h2"
              display="inline"
              color="secondary.main"
              sx={{ fontWeight: "bold" }}
            >
              #
            </Typography>
            <Typography variant="h2" display="inline" sx={[{ fontWeight: "bold" }, (theme) => ({
              '&:hover': {
                color: theme.palette.secondary.main,
                transition: "color 0.5s ease-in-out"
              },
            }),]}>
              {user.email && user.email.split('@')[0]}
            </Typography>
            <Typography
              variant="h2"
              display="inline"
              color="secondary.main"
              sx={{ fontWeight: "bold" }}
            >
              !
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ textAlign: "left" }}>
          <Paper elevation={10} sx={{ p: 5, borderRadius: 10, height: 260 }}>
            <Tooltip
              title="The current real-time price of electricity in the selected country, measured in euros per megawatt-hour."
              placement="right-start"
            >
              <IconButton sx={{ p: 0, float: "right" }}>
                <HelpOutlineIcon
                  sx={{ color: "secondary.main" }}
                  fontSize="large"
                />
              </IconButton>
            </Tooltip>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Avatar
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "secondary.main",
                }}
              >
                <BoltIcon sx={{ fontSize: "35px" }} />
              </Avatar>
            </Box>
            <Typography variant="h4" textAlign="center">
              Current price of electricity {loading ? <Box><CircularProgress sx={{ alignSelf: "center" }} color={"secondary"} /></Box> : <><Box sx={{ color: "secondary.main", fontWeight: "bold" }}>{price}  €/MWh</Box>
                <Chip color={price > avgDaily ? "error" : "success"} label={price > avgDaily ? `Above Daily Average: ${avgDaily.toFixed(2)}` : `Below Daily Average: ${avgDaily.toFixed(2)}`} /></>}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} sx={{ textAlign: "left" }}>
          <Paper elevation={10} sx={{ p: 5, borderRadius: 10, height: 260 }}>
            <Tooltip
              title="This represents how much CO2eq (CO2 equivalent) is
                      generated by the current electrical production in the selected country
                      (e.g. coal power plants produce roughly 986 grams CO2eq/kWh)."
              placement="right-start"
            >
              <IconButton sx={{ p: 0, float: "right" }}>
                <HelpOutlineIcon
                  sx={{ color: "secondary.main" }}
                  fontSize="large"
                />
              </IconButton>
            </Tooltip>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Avatar
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "secondary.main",
                }}
              >
                <Co2Icon sx={{ fontSize: "35px" }} />
              </Avatar>
            </Box>
            <Typography variant="h4" textAlign="center">
              Current CO<sub>2</sub> emissions {loading ? <Box><CircularProgress sx={{ alignSelf: "center" }} color={"secondary"} /></Box> : <><Box sx={{ color: "secondary.light", fontWeight: "bold" }}>{emissions} g CO<sub>2</sub>eq/kWh</Box>
                <Chip color={emissions > 51.19 ? "error" : "success"} label={emissions > 51.19 ? `Above Daily Average: 51.19` : `Below Daily Average: 51.19`} /></>}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ position: "absolute", right: 0, bottom: 0 }} zIndex={0}>
        <HomeDecoration />
      </Box>
    </Container>
  );
}

export default Home;
