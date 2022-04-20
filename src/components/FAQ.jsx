import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

export default function FAQ({ data: { title, entries } }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const accordian = (entries, key) => (
    <Accordion
      key={key}
      expanded={expanded === `panel${key}`}
      onChange={handleChange(`panel${key}`)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography sx={{ color: "text.secondary" }}>
          {entries.question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{entries.answer}</Typography>
      </AccordionDetails>
    </Accordion>
  );

  return (
    <Paper
      sx={{
        padding: 1.5,
        paddingBottom: 10,
        maxWidth: { md: 800 },
        margin: "auto",
        marginTop:1
      }}
    >
      <Container id="FAQ">
        <Typography variant="h5">{title}</Typography>
        <Box sx={{ paddingTop: 2 }}>
          {entries.length && entries.map((ele, i) => accordian(ele, i))}
        </Box>
      </Container>
    </Paper>
  );
}
