import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function PupCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="240"
          image={props.smallImage}
          alt={props.name}
        />
      </CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2">
            {props.breed}, {props.color}, {props.price}
          </Typography>
        </CardContent>
      <CardActions>
        <Button size="small" color="inherit">
          Join waitlist
        </Button>
      </CardActions>
    </Card>
  );
}