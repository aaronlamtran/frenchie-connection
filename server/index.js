/* eslint-disable no-console */
const express = require('express');
// const cors = require('cors');

const app = express();

const port = 3004;

// app.use(cors());
app.use(express.static(`${__dirname}/../client/dist`));

app.get('/hello', (req, res) => {
  res.send('Hello World');
})

app.listen(port, () => { console.log(`Successfully running on port ${port}`); });
