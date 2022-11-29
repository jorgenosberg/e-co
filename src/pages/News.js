import * as React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "55%",
          height: "85%",
        }}
      >
        <Paper elevation={10} sx={{py: 4, height: "15%", borderRadius: 10, display:"flex", justifyContent:"center", alignItems:"center"}}>
          <Avatar
            sx={{
              width: "70px",
              height: "70px",
              backgroundColor: "secondary.main",
            }}
          >
            <NewspaperIcon sx={{ fontSize: "45px" }} />
          </Avatar>

          <Typography variant="h4" align="center" sx={{pl: 4}}>
            Energy News
          </Typography>
        </Paper>

        <Paper elevation={10} sx={{ px: 2, pt: 4, height: "60%", borderRadius: 10 }}>
          <Grid container spacing={2}>
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
                  title="On this page we have compiled a little selection of news about different topics related to energy and sustainability. Please select a topic from the dropdown to access the feed."
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
        </Paper>

        <Paper elevation={10} sx={{pt:1, height: "20%", borderRadius:10}}>
          <Typography variant="h5" align="center">Our recommended sources right now:</Typography>
          <Box sx={{display:"flex", justifyContent: "space-around", alignItems:"center"}}>
            <a href="https://www.ft.com/"><img src={FTLogo} alt="Financial Times" style={{width: "80px"}} /></a>
            <a href="https://www.euronews.com/"><img src={ENLogo} alt="Euronews" style={{width: "150px"}}/></a>
            <a href="https://energypost.eu/"><img src={EPLogo} alt="Energy Post" style={{width: "150px"}}/></a>
          </Box>
        </Paper>
      </Box>
      <Paper
        elevation={10}
        sx={{ p: 4, borderRadius: 10, width: "40%", height: "85%" }}
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
    </Box>
  );
}

export default News;
