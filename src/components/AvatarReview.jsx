import React, { useMemo, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IMAGES from '../images/imageExports';

function AvatarReview({ data: { text, img, name, idx }}) {
  const [isTextLong, setIsTextLong] = useState(false);
  const blurb = useMemo(() => {
    if (text.length <= 130) {
      return text;
    }
    const trimedBlurb = text.slice(0, Math.max(0, text.slice(0, 130).lastIndexOf(' ')));
    setIsTextLong(true);
    return `${trimedBlurb}... Read More`;
  }, [text]);
  const toggleReadMore = (e) => {
    e.preventDefault();
    setIsTextLong(!isTextLong);
  };
  const keys = Object.keys(IMAGES);
  const localImage = IMAGES[keys[idx]];
  const doesExistLocally = localImage !== undefined && localImage !== '';
  const image = doesExistLocally ? localImage : img;

  return (
    <>
      <Avatar
        onClick={toggleReadMore}
        alt={name}
        src={image}
      />
      <Typography variant="body1" onClick={toggleReadMore}>
        {isTextLong ? blurb : text}
        <br />
        <Typography variant="span" align="right">
          -
          {name}
        </Typography>
      </Typography>
    </>
  );
}

export default AvatarReview;
