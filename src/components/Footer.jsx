import React from "react";
import Grid from "@mui/material/Grid";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import Logo from "./Logo";
const openInNewTab = (url) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

export default function Footer({ isShowNav }) {
  const url = "https://www.instagram.com/thefrenchieconnection.sd/";
  return (
    <Grid
      container
      direction="row"
      spacing={1}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        pb: "24px",
        display: true ? "flex" : "none",
        bottom: 0,
      }}
    >
      <Grid item>
        <MailOutlineIcon fontSize="large" />
      </Grid>
      <Grid item>
        <InstagramIcon fontSize="large" onClick={() => openInNewTab(url)} />
      </Grid>
    </Grid>
  );
}
