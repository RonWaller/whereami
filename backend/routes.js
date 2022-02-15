const express = require("express");
const locationModel = require("./models");
const app = express();

app.post("/add_location", async (request, response) => {
  const location = new locationModel(request.body);

  try {
    await location.save();
    response.send(location);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/locations", async (request, response) => {
  const locations = await locationModel.find().sort({ $natural: -1 });

  try {
    response.header("Access-Control-Allow-Origin", "*");
    response.send(locations);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;