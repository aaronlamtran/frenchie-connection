import React, { useMemo } from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

function AvatarReview({ data: { text, img, name } }) {
  const blurb = useMemo(() => {
    if (text.length <= 130) {
      return text;
    }
    const trimedBlurb = text.slice(0, Math.max(0, text.slice(0, 130).lastIndexOf(' ')));
    return `${trimedBlurb}..."`;
  }, [text]);
  return (
    <>
      <Avatar
        alt={name}
        src={img}
      />
      <Typography variant="body1">
        {blurb}
        -
        {' '}
        {name}
      </Typography>
    </>
  );
}

export default AvatarReview;
