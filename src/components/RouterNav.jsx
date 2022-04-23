import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import LogoText from "./LogoText";
import { useNavigate } from "react-router-dom";

const pages = ["About", "Pups", "FAQ", "Contact", "Waitlist", "Admin Login"];
const pageNavTo = ["About", "Pups", "FAQ", "Contact", "Join", "Login"];

export default function RouterNav(props) {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    const canNavigate = event.target.id !== "" || undefined;
    if (canNavigate) {
      navigate(`/${pageNavTo[event.target.id]}`);
    }
    setAnchorElNav(null);
  };

  return (
    <AppBar
      elevation={0}
      position="static"
      sx={{
        maxWidth: { md: 900 },
        margin: "auto",
      }}
    >
      <Container maxWidth="xl" sx={{ marginBottom: 1 }}>
        <Toolbar disableGutters>
          <LogoText size="small" />
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Grid container>
              <Grid item xs={10}></Grid>
              <Grid item xs={2}>
                <IconButton
                  size="medium"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Grid>
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
          <Grid
            container
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {pages.map((page, i) => (
              <Grid item key={i}>
                <Button
                  component="a"
                  key={page}
                  id={i}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 1,
                    color: "black",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  {page}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
