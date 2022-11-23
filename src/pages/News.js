import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const feedSources = [
  { tag: "Energy", source: "https://rss.app/embed/v1/list/fcybDdzmgZe4YUUh" },
  {
    tag: "Electricity",
    source: "https://rss.app/embed/v1/list/R35m7kcK4ubAhPWS"
  },
  {
    tag: "Renewable energy",
    source: "https://rss.app/embed/v1/list/GZo5gt4AwJmXjO9v"
  }
];

function News() {
  const [value, setValue] = React.useState({
    value: {
      tag: "Energy",
      source: "https://rss.app/embed/v1/list/fcybDdzmgZe4YUUh"
    }
  });
  return (
    <Container>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={10} sx={{ textAlign: "center", mt: 1 }}>
          <NewspaperIcon fontSize="large" />
          <Typography variant="h4" align="center">
            Energy News{" "}
            <Tooltip title="On this page we have compiled a little selection of news about different topics related to energy and sustainability. Please select a topic from the dropdown to access the feed.">
              <IconButton sx={{ p: 0 }}>
                <HelpOutlineIcon sx={{ color: "primary" }} fontSize="large" />
              </IconButton>
            </Tooltip>
          </Typography>
        </Grid>

        <Grid item xs={12} md={10} sx={{ textAlign: "center" }}>
          <Autocomplete
            disableClearable
            autoHighlight
            defaultValue={feedSources[0]}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            id="combo-box-demo"
            options={feedSources}
            sx={{ width: 200 }}
            getOptionLabel={(option) => option.tag}
            renderInput={(options) => <TextField {...options} label="Topic" />}
          />
        </Grid>

        <Grid item xs={12} md={10} height="50vh">
          <iframe
            title="rss-news-feed"
            width="100%"
            height="100%"
            src={feedSources
              .filter((item) => item.tag === value.tag)
              .map((item) => item.source)}
            frameborder="0"
          ></iframe>
        </Grid>
      </Grid>
    </Container>
  );
}

export default News;
