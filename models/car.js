// models/cars.js

const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  brand: String,
  model: String, 
  year: Number,
});

//REGISTER THE MODEL
const Car = mongoose.model("Car", carSchema);

//EXPORT THE MODEL
 module.exports = Car
 