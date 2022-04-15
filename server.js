const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3010;
const { MONGO_USER, MONGO_PW } = require('./config.js');
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PW}@frenchie-connection-db.nxc9c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const mongoose = require('mongoose');

app.use(express.static(path.join(__dirname, '/build')));

mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("db connection success"))
    .catch(err => console.log('db connection error:', err));
app.get('/api/test', (req, res) => {

  const test = "test";
  res.json(test);

  console.log(`Sent test`);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/build/index.html'));
});



app.listen((port), () => console.log(`Server listening on ${port}`));

