const express = require('express');

const app = express();

const port = 3004;

app.use(express.static(`${__dirname}/../client/dist`));

app.listen(port, () => { console.log(`Successfully running on port ${port}`); });
