import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import Typography from "@mui/material/Typography";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import IconButton from "@mui/material/IconButton";
import { Tooltip as MuiTooltip } from "@mui/material/Tooltip";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

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

function Statistics() {
  const [labels, setLabels] = useState([]);
  const [duration, setDuration] = useState("day");
  const [type, setType] = useState("price");

  useEffect(() => {
    setLabels(generateLabels());
  }, [duration]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text:
          type === "price"
            ? `Price/MWh for the past ${duration}`
            : `CO2 emissions for the past ${duration}`
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text:
            duration === "day" ? "Hour" : duration === "week" ? "Day" : "Date"
        }
      },
      y: {
        title: {
          display: true,
          text: type === "price" ? "Euros (€)" : "CO2 eq"
        }
      }
    }
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
          "Sunday"
        ];
        const day = time.getDay();
        return days.slice(day).concat(days.slice(0, day));

      case "month":
        return Array.from(Array(31).keys());
    }
  };

  const generateChartLegend = () => {
    if (type === "price") return duration === "day" ? "€/MWh" : "Peak of €/MWh";
    if (type === "CO2")
      return duration === "day" ? "CO2 eq/KWh" : "Peak of CO2 eq/KWh";
  };

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: generateChartLegend(),
        data: labels.map(() =>
          faker.datatype.number(
            type === "price" ? { min: 200, max: 600 } : { min: 10, max: 70 }
          )
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)"
      }
    ]
  };

  return (
    <Container>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sx={{ textAlign: "center", mb: 5 }}>
          <InsertChartIcon fontSize="large" />
          <Typography variant="h4">
            Statistics{" "}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} display="flex" justifyContent="space-evenly">
          <Button
            variant="contained"
            sx={{ background: type === "price" ? "#1976d2" : "#aaa" }}
            onClick={() => setType("price")}
          >
            Price/MWh
          </Button>
          <Button
            variant="contained"
            sx={{ background: type === "CO2" ? "#1976d2" : "#aaa" }}
            onClick={() => setType("CO2")}
          >
            CO<sub>2</sub>/KWh
          </Button>
          <Button
            variant="contained"
            sx={{ background: type === "priceCO2" ? "#1976d2" : "#aaa" }}
            onClick={() => setType("priceCO2")}
          >
            CO<sub>2</sub>/Price
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
            sx={{ background: duration === "day" ? "#1976d2" : "#aaa" }}
            onClick={() => setDuration("day")}
          >
            1 Day
          </Button>
          <Button
            variant="contained"
            sx={{ background: duration === "week" ? "#1976d2" : "#aaa" }}
            onClick={() => setDuration("week")}
          >
            1 Week
          </Button>
          <Button
            variant="contained"
            sx={{ background: duration === "month" ? "#1976d2" : "#aaa" }}
            onClick={() => setDuration("month")}
          >
            1 Month
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
export default Statistics;
