import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import { db } from "../api/firebase";
import CountrySelector, { regionMenuOptions } from "../components/CountrySelector";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

// APIs
import { fetchDayPrices, fetchMonthPrices, fetchWeekPrices } from "../api/stats";



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function Statistics({ theme, userRegion }) {
  const [duration, setDuration] = useState("day");
  const [type, setType] = useState("price");
  const [datapoints, setDatapoints] = useState({});
  const [region, setRegion] = useState(userRegion || { code: "FR", code3: "FRA", label: "France" });


  useEffect(() => {
    if (type === "price") {
      (async () => {
        switch (duration) {
          case "day":
            const day = await fetchDayPrices(region.code3);
            setDatapoints(day);
            break;

          case "week":
            const week = await fetchWeekPrices(region.code3);
            setDatapoints(week);
            break;

          case "month":
            const month = await fetchMonthPrices(region.code3);
            console.log(month)
            setDatapoints(month);
            break;
        }
      })()
    } else {
      const labels = generateLabels()
      setDatapoints({
        values: labels.map(() =>
          faker.datatype.number(
            type === "price" ? { min: 200, max: 600 } : { min: 10, max: 70 }
          )
        ),
        labels: labels
      })
    }
  }, [duration, region, type])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text:
          type === "price"
            ? `Price/MWh for the past ${duration}`
            : `CO2 emissions for the past ${duration}`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text:
            duration === "day" ? "Hour" : duration === "week" ? "Day" : "Date",
        },
        grid: {
          display: false
        }
      },
      y: {
        title: {
          display: true,
          text: type === "price" ? "Euros (€)" : "CO2 eq",
        },
        grid: {
          display: false
        }
      },
    },
  };

  const generateLabels = () => {
    const time = new Date();
    switch (duration) {
      case "day":
        const labels = [];
        let hour = time.getHours();
        let x = 12;
        while (x >= 0) {
          labels.push(`${hour}:00`);
          if (hour <= 0) {
            hour = 24;
          }
          hour -= 2;
          x -= 1;
        }
        return labels.reverse();

      case "week":
        const days = [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ];
        const day = time.getDay();
        return days.slice(day).concat(days.slice(0, day));

      case "month":
        return Array.from(Array(31).keys()).filter(x => x % 2);
    }
  };

  const generateChartLegend = () => {
    if (type === "price") return duration === "day" ? "€/MWh" : "Average of €/MWh";
    if (type === "CO2")
      return duration === "day" ? "CO2 eq/KWh" : "Average of CO2 eq/KWh";
  };

  const data = {
    labels: datapoints.labels,
    datasets: [
      {
        fill: true,
        label: generateChartLegend(),
        data: datapoints.values,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <Container>
      <Paper elevation={10} sx={{ p: 5, borderRadius: 10 }}>
        <Grid container spacing={2} justifyContent="center">
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
            <Avatar sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "secondary.main",
                }}>
              <InsertChartIcon sx={{fontSize:"35px"}}/>
            </Avatar>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Statistics
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            lg={3}
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <CountrySelector value={region} setValue={setRegion} countries={regionMenuOptions} boxLabel="Country" />
          </Grid>
          <Grid item xs={12} md={6} display="flex" justifyContent="space-evenly">
            <Button
              variant="contained"
              sx={{ background: type === "price" ? theme.palette.primary.main : "#aaa" }}
              onClick={() => setType("price")}
            >
              Price/MWh
            </Button>
            <Button
              variant="contained"
              sx={{ background: type === "CO2" ? theme.palette.primary.main : "#aaa" }}
              onClick={() => setType("CO2")}
            >
              CO<sub>2</sub>/KWh
            </Button>
            <Button
              variant="contained"
              sx={{ background: type === "priceCO2" ? theme.palette.primary.main : "#aaa" }}
              onClick={() => setType("priceCO2")}
            >
              CO<sub>2</sub>/
              Price
            </Button>
          </Grid>
          <Grid item xs={12} md={10}>
            <Line options={options} data={data} />
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
            display="flex"
            flexDirection={{ xs: "row", md: "column" }}
            justifyContent="space-evenly"
          >
            <Button
              variant="contained"
              sx={{ background: duration === "day" ? theme.palette.primary.main : "#aaa" }}
              onClick={() => setDuration("day")}
            >
              1 Day
            </Button>
            <Button
              variant="contained"
              sx={{ background: duration === "week" ? theme.palette.primary.main : "#aaa" }}
              onClick={() => setDuration("week")}
            >
              1 Week
            </Button>
            <Button
              variant="contained"
              sx={{ background: duration === "month" ? theme.palette.primary.main : "#aaa" }}
              onClick={() => setDuration("month")}
            >
              1 Month
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
export default Statistics;
