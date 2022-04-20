import React, { useMemo, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";


export default function AvatarReview({ data: { text, img, name, idx }, setExpandedAtIndex, expanded }) {
  const [isTextLong, setIsTextLong] = useState(false);
  const blurb = useMemo(() => {
    if (text.length <= 130) {
      return text;
    }
    const trimedBlurb = text.slice(
      0,
      Math.max(0, text.slice(0, 130).lastIndexOf(" "))
    );
    setIsTextLong(true);
    return `${trimedBlurb}... Read More`;
  }, [text]);
  const toggleReadMore = (e) => {
    e.preventDefault();
    setExpandedAtIndex(idx)
    setIsTextLong(!isTextLong);
  };



  return (
    <>
      <Avatar onClick={toggleReadMore} alt={name} src={img} />
      <Typography variant="body1" onClick={toggleReadMore}>
        {!expanded ? blurb : text}
        <br />
        <Typography variant="span" align="right">
          -{name}
        </Typography>
      </Typography>
    </>
  );
}
