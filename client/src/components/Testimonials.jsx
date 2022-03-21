import React from 'react';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function Testimonials(props) {
  const { title, entries } = props.data;
  return (
    <Container>
      <h3>
        {title}
      </h3>
      <Stack direction="column" spacing={2}>
        {entries.map((person) => (
          <div key={person.name}>

            <Avatar
              alt={person.name}
              src={person.img}
            />
            <Typography>
              {person.text}
            </Typography>
            <Typography>
              -
              {person.name}
            </Typography>
          </div>
        )) }
      </Stack>

    </Container>
  );
}

export default Testimonials;
