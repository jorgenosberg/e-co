import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { fetchDayPrices } from "../api/stats";
import { ReactComponent as HomeDecoration } from "../assets/home-decoration.svg";
import { faker } from "@faker-js/faker";
import { UserContext } from "../App";

function Home() {
  const user = React.useContext(UserContext);
  const [price, setPrice] = React.useState(0);
  const [emissions] = React.useState(Number(randomNumberGenerator()));

  React.useEffect(() => {
    (async () => {
      const response = await fetchDayPrices("FRA");
      const hour = new Date().getHours()
      setPrice((response.values[hour] / 1000).toFixed(2));
    })()
  }, [])

  function randomNumberGenerator() {
    return faker.datatype.float({ min: 10, max: 70, precision: 0.01 });
  }

  return (
    <Container>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sx={{ textAlign: "left" }}>
          <Typography variant="h2" display="inline" sx={{ fontWeight: "400" }}>
            Welcome,{" "}
            <Typography
              variant="h2"
              display="inline"
              color="secondary.main"
              sx={{ fontWeight: "400" }}
            >
              #
            </Typography>
            {user.email.split('@')[0]}
            <Typography
              variant="h2"
              display="inline"
              color="secondary.main"
              sx={{ fontWeight: "400" }}
            >
              !
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "left" }}>
          <Typography variant="h4">
            The current price of electricity is: <Box display="inline" sx={{ px: 1, borderRadius: 2, backgroundColor: "secondary.light" }}>{price}</Box> €/kWh{" "}
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
            The current CO2 emissions is: <Box display="inline" sx={{ px: 1, borderRadius: 2, backgroundColor: "secondary.light" }}>{emissions}</Box> g CO<sub>2</sub>eq/kWh{" "}
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
      <Box sx={{ position: "fixed", right: 0, bottom: 0 }}>
        <HomeDecoration />
      </Box>
    </Container>
  );
}

export default Home;
