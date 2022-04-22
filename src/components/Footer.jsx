import React from "react";
import Stack from "@mui/material/Stack";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Logo from "./Logo";
const openInNewTab = (url) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

export default function Footer() {
  const url = 'https://www.instagram.com/thefrenchieconnection.sd/'
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ justifyContent: "center", alignItems: "center", height: "10vh", color: "black" }}
    >
      <Logo/>
      <MailOutlineIcon fontSize="large" />
      <InstagramIcon fontSize="large" onClick={() => openInNewTab(url)} />
    </Stack>
  );
}
