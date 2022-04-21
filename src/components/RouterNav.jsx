import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Logo from "./Logo";
import LogoText from "./LogoText";
import { useNavigate } from "react-router-dom";

const pages = [
  "About",
  "Pups",
  "FAQ",
  "Contact",
  "Join Waitlist",
  "Admin Login",
];
const pageNavTo = ["About", "Pups", "FAQ", "Contact", "Join", "Login"];

export default function RouterNav(props) {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    const canNavigate = event.target.id !== '' || undefined;
    if (canNavigate) {
      navigate(`/${pageNavTo[event.target.id]}`);
    }
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        maxWidth: { md: 900 },
        margin: "auto",
      }}
    >
      <Container maxWidth="xl" sx={{ marginBottom: 1 }}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Logo />
            <LogoText />
          </Typography>
          {/* xs toolbar */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, i) => (
                <MenuItem
                  key={page}
                  id={i}
                  component="a"
                  onClick={handleCloseNavMenu}
                >
                  {page}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <Logo />
            <LogoText />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, i) => (
              <Button
                component="a"
                key={page}
                id={i}
                onClick={handleCloseNavMenu}
                sx={{ my: 1, color: "black", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
