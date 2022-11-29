import * as React from "react";

// MUI MATERIAL IMPORTS
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

// MUI ICONS IMPORTS
import SettingsIcon from "@mui/icons-material/Settings";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import FlagIcon from "@mui/icons-material/Flag";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LightLogo from "../assets/logo.svg";
import DarkLogo from "../assets/logo-dark.svg";
import { regionMenuOptions } from "./CountrySelector";

// REACT ROUTER DOM IMPORTS
import { Link } from "react-router-dom";
import { logOut } from "../api/auth";

// FIREBASE IMPORTS
import { db } from "../api/firebase";
import { ref, set } from "firebase/database";
import { UserContext } from "../App";


function Header(props) {
  const user = React.useContext(UserContext);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElRegion, setAnchorElRegion] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    logOut();
  };

  const handleOpenRegionMenu = (event) => {
    setAnchorElRegion(event.currentTarget);
  };

  const handleCloseRegionMenu = () => {
    setAnchorElRegion(null);
  };

  const updateRegion = (region) => {
    set(ref(db, `users/${user.uid}/statsRegion`), region);
  }

  return (
    <AppBar position="static" color="default" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <Box
              component="img"
              sx={{
                width: 100,
                flexGrow: 0,
                display: "flex"
              }}
              alt="Logo"
              src={props.theme.palette.mode === "light" ? LightLogo : DarkLogo}
            />
          </Link>
          <Box
            sx={{ flexGrow: 1, display: "flex", }}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Button variant="text" component={Link} to="/" sx={{ fontWeight: "bold", color: "text.secondary", "&:hover": { color: "secondary.main" } }}>
              HOME
            </Button>
            <Button variant="text" component={Link} to="/calculator" sx={{ fontWeight: "bold", color: "text.secondary", "&:hover": { color: "secondary.main" } }}>
              CALCULATOR
            </Button>

            <Button variant="text" component={Link} to="/statistics" sx={{ fontWeight: "bold", color: "text.secondary", "&:hover": { color: "secondary.main" } }}>
              STATISTICS
            </Button>

            <Button variant="text" component={Link} to="/news" sx={{ fontWeight: "bold", color: "text.secondary", "&:hover": { color: "secondary.main" } }}>
              NEWS
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Preferred Region">
              <IconButton onClick={handleOpenRegionMenu} sx={{ "&:hover": { color: "secondary.main" } }}>
                <img
                  loading="lazy"
                  width="30"
                  src={`https://flagcdn.com/w20/${props.userRegion.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${props.userRegion.code.toLowerCase()}.png 2x`}
                  alt="Selected region flag"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElRegion}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              open={Boolean(anchorElRegion)}
              onClose={handleCloseRegionMenu}
            >
              {regionMenuOptions.map((option) => (
                <MenuItem
                  key={option.code}
                  onClick={() => updateRegion(option)}
                >
                  <Box sx={{ mr: 1 }}>
                    <img
                      loading="lazy"
                      width="20"
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      alt="Selected region flag"
                    />
                  </Box>
                  <Typography textAlign="center">{option.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <Tooltip title="Settings">
              <IconButton component={Link} to="/settings" sx={{ "&:hover": { color: "secondary.main" } }}>
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="User Menu">
              <IconButton onClick={handleOpenUserMenu} sx={{ "&:hover": { color: "secondary.main" } }}>
                <PersonRoundedIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "40px", color: "default" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                key="Account"
                onClick={handleCloseUserMenu}
                component={Link}
                to="/account"
                sx={{ "&:hover": { color: "secondary.main" } }}
              >
                <AccountCircleIcon />
                <Typography textAlign="center" sx={{ ml: 0.5 }}>
                  Account
                </Typography>
              </MenuItem>

              <MenuItem key="Theme" onClick={props.colorMode.toggleColorMode} sx={{ "&:hover": { color: "secondary.main" } }}>
                {props.theme.palette.mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
                <Typography textAlign="center" sx={{ ml: 0.5 }}>
                  Theme
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem
                key="Logout"
                onClick={handleCloseUserMenu}
                component={Link}
                to="/login"
                sx={{ "&:hover": { color: "secondary.main" } }}
              >
                <LogoutIcon />
                <Typography textAlign="center" sx={{ ml: 0.5 }}>
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
