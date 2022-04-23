import React, { useMemo, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function AvatarReview({
  data: { text, img, name, idx },
  setExpandedAtIndex,
  expanded,
}) {
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
    setExpandedAtIndex(idx);
    setIsTextLong(!isTextLong);
  };

  return (
    <Box>
      <div className="avatar-review-stack">
        <Avatar onClick={toggleReadMore} alt={name} src={img} />
        <div>
          <Typography align="left" onClick={toggleReadMore}>
            {!expanded ? blurb : text}
            <br />
          </Typography>
          <Typography
            variant="body2"
            align="right"
            sx={{ color: "text.secondary" }}
          >
            -{name}
          </Typography>
        </div>
      </div>
    </Box>
  );
}
