import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";

export default function FAQ({ data: { title, entries } }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const accordian = (entries, key) => (
    <Accordion
      sx={{ paddingTop: 2 }}
      elevation={0}
      key={key}
      expanded={expanded === `panel${key}`}
      onChange={handleChange(`panel${key}`)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography >{entries.question}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={{ color: "text.secondary" }}>
          {entries.answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );

  return (
    <Box
      sx={{
        paddingBottom: 10,
        maxWidth: { md: 500 },
        margin: "auto",
        marginTop: 1,
        justify: "center",
        minHeight: "70vh",
      }}
    >
      <Typography variant="h4" sx={{textAlign: "center",}}>{title}</Typography>
      <>{entries.length && entries.map((ele, i) => accordian(ele, i))}</>
    </Box>
  );
}
