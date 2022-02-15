require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const Router = require("./routes");

const port = process.env.PORT || 8080;

const app = express();

app.use(cors())
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(Router);

app.listen(port, () => {
  console.log(`Serve now listening on ${port} `);
});