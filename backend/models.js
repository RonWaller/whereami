const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    
      city: String,
      state: String,
      lat: Number,
      lon: Number
},
    { timestamps: true}
  
);

const Location = mongoose.model("Location", LocationSchema);

module.exports = Location;