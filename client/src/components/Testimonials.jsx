import React, { useMemo } from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import AvatarReview from './AvatarReview';

function Testimonials(props) {
  const { title, entries } = props.data;

  return (
    <Container>
      <h3>
        {title}
      </h3>

      <Stack direction="column" spacing={0.5}>
        {entries.map((person, idx) => (
          <div key={person.name}>
            <Stack direction="row" spacing={0.5}>
              <AvatarReview data={{...person, idx: idx}} />
            </Stack>
          </div>
        ))}
      </Stack>
    </Container>
  );
}

export default Testimonials;
