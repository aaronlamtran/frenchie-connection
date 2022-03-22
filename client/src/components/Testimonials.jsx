import React, { useMemo } from 'react';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AvatarReview from './AvatarReview';

function Testimonials(props) {
  const { title, entries } = props.data;

  return (
    <Container>
      <h3>
        {title}
      </h3>

      <Stack direction="column" spacing={0.5}>
        {entries.map((person) => (
          <div key={person.name}>
            <Stack direction="row" spacing={0.5}>
              <AvatarReview data={person} />
            </Stack>
          </div>
        ))}
      </Stack>
    </Container>
  );
}

export default Testimonials;
