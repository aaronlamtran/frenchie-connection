import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Logo from "./Logo";
const openInNewTab = (url) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

export default function Footer() {
  const url = "https://www.instagram.com/thefrenchieconnection.sd/";
  return (
    <Grid
      container
      direction="row"
      // spacing={2}
      // sx={{ justifyContent: "center", alignItems: "center", pb:"24px" }}
      // direction="column"
      spacing={1}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        // flexGrow: 1,
        // flexShrink: 0,
        pb: "28px",
        // background: "yellow",
        // height: "100%",
        position: "fixed",
        bottom: 0,
      }}
    >
      <Grid item>
        <Logo />
      </Grid>
      <Grid item>
        <MailOutlineIcon fontSize="large" />
      </Grid>
      <Grid item>
        <InstagramIcon fontSize="large" onClick={() => openInNewTab(url)} />
      </Grid>
    </Grid>
  );
}
