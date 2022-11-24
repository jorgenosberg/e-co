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
import Brightness6Icon from "@mui/icons-material/Brightness6";

// REACT ROUTER DOM IMPORTS
import { Link } from "react-router-dom";

import { logOut } from "../api/auth";

const regionMenuOptions = [
  { code: "EU", name: "Europe", currency: "EUR" },
  { code: "US", name: "United States", currency: "USD" },
  { code: "CA", name: "Canada", currency: "CAD" }
];

function Header(props) {
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

  return (
    <AppBar position="static" color="default">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/home">
            <Box
              component="img"
              sx={{
                width: 100,
                flexGrow: 0,
                display: "flex"
              }}
              alt="Logo"
              src={props.theme.palette.mode === "light" ? "images/logo.svg" : "images/logo-dark.svg"}
            />
          </Link>
          <Box
            sx={{ flexGrow: 1, display: "flex", }}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Button variant="text" component={Link} to="/home" sx={{ color: "text.secondary", "&:hover": { color: "secondary.main" } }}>
              HOME
            </Button>
            <Button variant="text" component={Link} to="/calculator" sx={{ color: "text.secondary", "&:hover": { color: "secondary.main" } }}>
              CALCULATOR
            </Button>

            <Button variant="text" component={Link} to="/statistics" sx={{ color: "text.secondary", "&:hover": { color: "secondary.main" } }}>
              STATISTICS
            </Button>

            <Button variant="text" component={Link} to="/news" sx={{ color: "text.secondary", "&:hover": { color: "secondary.main" } }}>
              NEWS
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Region & Currency">
              <IconButton onClick={handleOpenRegionMenu} sx={{ "&:hover": { color: "secondary.main" } }}>
                <FlagIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElRegion}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={Boolean(anchorElRegion)}
              onClose={handleCloseRegionMenu}
            >
              {regionMenuOptions.map((option) => (
                <MenuItem
                  disabled
                  key={option.code}
                  onClick={handleCloseUserMenu}
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
                  <Typography textAlign="center">{option.currency}</Typography>
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
              sx={{ mt: "45px" }}
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
              >
                <AccountCircleIcon />
                <Typography textAlign="center" sx={{ ml: 0.5 }}>
                  Account
                </Typography>
              </MenuItem>

              <MenuItem key="Theme" onClick={props.colorMode.toggleColorMode}>
                <Brightness6Icon />
                <Typography textAlign="center" sx={{ ml: 0.5 }}>
                  Theme
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem
                key="Logout"
                onClick={handleCloseUserMenu}
                component={Link}
                to="/log-in"
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
