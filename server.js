require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const { MONGO_USER, MONGO_PW, MONGO_URI, NODE_ENV } = process.env;
const PORT  = process.env.PORT || 5000;
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PW}@frenchie-connection-db.nxc9c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const cors = require('cors');
console.log({ MONGO_USER, MONGO_PW, PORT, NODE_ENV });
console.log('are uris the same?', MONGO_URI===uri);

const mongoose = require("mongoose");
const dogRouter = require("./routes/dog-waitlist-routes");
const waitlistRouter = require("./routes/waitlist-routes");
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/dogs", dogRouter);
app.use("/waitlist", waitlistRouter);
app.use(express.static(path.join(__dirname, "/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("db connection success"))
  .catch((err) => console.log("db connection error:", err));


app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
