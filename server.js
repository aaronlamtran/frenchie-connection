const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3010;

app.use(express.static(path.join(__dirname, '/build')));

app.get('/api/test', (req, res) => {

  const test = "test";
  res.json(test);

  console.log(`Sent test`);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/build/index.html'));
});

app.listen((port), () => console.log(`Server listening on ${port}`));

