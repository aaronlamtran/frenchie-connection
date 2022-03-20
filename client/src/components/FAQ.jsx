import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function FAQ(props) {
  const [expanded, setExpanded] = React.useState(false);
  const { title, entries } = props.data;

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
        <Typography sx={{ color: 'text.secondary' }}>
          {entries.question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {entries.answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );

  return (
    <div>
      <h3>{title}</h3>
      <div>
        {entries.length && entries.map((ele, i) => accordian(ele, i))}
      </div>
    </div>
  );
}

export default FAQ;
