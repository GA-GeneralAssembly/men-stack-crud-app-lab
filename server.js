const express = require('express')
const dotenv = require('dotenv') //requiring the package 
dotenv.config() //load the enviroment variable from .env file
const mongoose = require('mongoose')
const methodOverride = require("method-override")
const morgan = require("morgan")
const Car = require("./models/car")

const app = express()

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

//Mount middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"))
app.use(morgan("dev"))



 //GET REQUEST
 app.get("/", async (req, res) => {
  res.render("index.ejs")
 })

 //GET /cars/new
 app.get("/cars/new", (req, res) => {
  res.render("cars/new.ejs")
 })


 // GET/cars/:carId
 app.get("/cars/:carId", async (req, res) => {
  const foundCar = await Car.findById(req.params.carId) // awat does not work without async
  res.render("cars/show.ejs", { car: foundCar})
});


// POST /cars
app.post("/cars", async (req, res) => {
  await Car.create(req.body) //Create
  res.redirect("/cars")
})

// DELETE Car
app.delete("/cars/:carId", async (req, res) => {
  await Car.findByIdAndDelete(req.params.carId)
  res.redirect("/cars")
})


// GET localhost:3000/cars/:carId/edit
app.get("/cars/:carId/edit", async (req, res) => {
  const foundCar = await Car.findById(req.params.carId);
  console.log(foundCar);
  res.render("cars/edit.ejs", {car: foundCar,})
  });


// GET /cars
app.get("/cars", async (req, res) => {
  const allCars = await Car.find() // if i did not add any condetion to what it should find then it will give me everything
  res.render("cars/index.ejs", { cars: allCars}) // .render() is to respond with a dynamically generated HTML view.
  // { cars: allCars} this is to send the allCars object as cars 
})

//UPDATE Car
app.put("/cars/:carId", async (req, res) => {

  // Update the car in the database
  await Car.findByIdAndUpdate(req.params.carId, req.body);

  // Redirect to the car's show page to see the updates
  res.redirect(`/cars/${req.params.carId}`);
});

app.listen(3000, () => {
  console.log('listenign to port 3000')
 }) 