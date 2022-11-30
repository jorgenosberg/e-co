import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FTLogo from "../assets/financial-times-logo.png";
import ENLogo from "../assets/euronews-logo.png";
import EPLogo from "../assets/energypost-logo.png";

const feedSources = {
  energy: "https://feed.mikle.com/widget/v2/158263/?preloader-text=Loading",
  emissions: "https://feed.mikle.com/widget/v2/158264/?preloader-text=Loading",
  sustainability:
    "https://feed.mikle.com/widget/v2/158265/?preloader-text=Loading",
};

function News() {
  const [feed, setFeed] = React.useState("energy");

  return (
    <Grid
      container
      spacing={2}
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid item xs={12} lg={8}>
        <Paper
          elevation={10}
          sx={{
            p: 5,
            borderRadius: 10,
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
              <Avatar
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "secondary.main",
                }}
              >
                <NewspaperIcon sx={{ fontSize: "35px" }} />
              </Avatar>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h4" align="center">
                Energy News
              </Typography>
            </Grid>

            <Grid item container spacing={2}>
              <Grid item xs={11}>
                <Tabs
                  value={feed}
                  onChange={(event, newValue) => setFeed(newValue)}
                >
                  <Tab label="Energy" value="energy" />
                  <Tab label="Emissions" value="emissions" />
                  <Tab label="Sustainability" value="sustainability" />
                </Tabs>
              </Grid>
              <Grid item xs={1}>
                <Box display="inline" justifyContent="right">
                  <Tooltip
                    title="On this page we have compiled a curated selection of news articles from reputable sources. We have selected these articles based on their relevance to the energy sector and their quality. We hope you enjoy reading them!"
                    placement="right-start"
                  >
                    <IconButton>
                      <HelpOutlineIcon sx={{ color: "secondary.main" }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <iframe
                  title="newsfeed"
                  src={feedSources[feed]}
                  height="303px"
                  width="100%"
                  class="fw-iframe"
                  scrolling="no"
                  frameborder="0"
                ></iframe>
              </Grid>
            </Grid>

            <Grid item container xs={12}>
              <Grid item xs={12}>
                <Typography variant="h5" align="center">
                  Our recommended news outlets at the moment:
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <a href="https://www.ft.com/">
                    <img
                      src={FTLogo}
                      alt="Financial Times"
                      style={{ width: "80px" }}
                    />
                  </a>
                  <a href="https://www.euronews.com/">
                    <img
                      src={ENLogo}
                      alt="Euronews"
                      style={{ width: "150px" }}
                    />
                  </a>
                  <a href="https://energypost.eu/">
                    <img
                      src={EPLogo}
                      alt="Energy Post"
                      style={{ width: "150px" }}
                    />
                  </a>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} lg={4} sx={{ minHeight: "85%" }}>
        <Paper
          elevation={10}
          sx={{
            p: 5,
            borderRadius: 10,
          }}
        >
          <iframe
            title="twitterfeed"
            src="https://feed.mikle.com/widget/v2/158266/?preloader-text=Loading"
            height="674px"
            width="100%"
            class="fw-iframe"
            scrolling="no"
            frameborder="0"
          ></iframe>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{height:"32px"}}></Box>
      </Grid>
    </Grid>
  );
}

export default News;
