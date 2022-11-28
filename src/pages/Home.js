import * as React from "react";
import { faker } from "@faker-js/faker";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { ReactComponent as HomeDecoration } from "../assets/home-decoration.svg";
import { getAuth } from "firebase/auth";
import axios from "axios";

function Home() {
  const [currentPrice, setCurrentPrice] = React.useState(115.4);
  const [currentEmissions, setCurrentEmissions] = React.useState(62.7);

  const auth = getAuth();
  const user = auth.currentUser;

  const getUserCountry = async () => {
    if (user !== null) {
      const cca2Code = user.country.code;
      const countryData = await axios.get(`https://restcountries.com/v3.1/alpha/${cca2Code}?fields=cca3`);
      return countryData.data.cca3;
    } else {
      return "FRA";
    }
  }

  const getCurrentPrice = async () => {
    let country = getUserCountry();
    let today = new Date();

    if (today.getHours() < 8) {
      today.setDate(today.getDate() - 1);
      today.setHours(23);
    }
    
    let todayFormatted = today.toLocaleDateString("en-CA");
    let currentHour = today.getHours();
    let apiUrl = `https://api.iea.org/rte/price/hourly/${country}/timeseries?from=${todayFormatted}&to=${todayFormatted}&currency=local`;

    const apiData = await axios.get(apiUrl);
    const pricePerMWh = apiData.data[currentHour].Value;
    const pricePerKWh = pricePerMWh / 1000;

    return pricePerKWh;
  }

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
            The current price of electricity is: <Box display="inline" sx={{ px: 1, borderRadius: 2, backgroundColor: "secondary.light" }}>{currentPrice}</Box> €/kWh{" "}
            <Tooltip
              title="The current real-time price of electricity in the selected country, measured in euros per kilowatt-hour."
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
            The current CO2 emissions is: <Box display="inline" sx={{ px: 1, borderRadius: 2, backgroundColor: "secondary.light" }}>{currentEmissions}</Box> g/kWh{" "}
            <Tooltip
              title="This represents how much CO2eq (CO2 equivalent) is
                      generated by the current electrical production in the selected country
                      (e.g. coal power plants produce roughly 986 grams CO2eq/kWh)."
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
    <Box sx={{position: "fixed", right: 0, bottom: 0}}>
    <HomeDecoration/>
    </Box>
    </Container>
  );
}

export default Home;
