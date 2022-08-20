const mongoose = require("mongoose");
const cities = require("./cities");
const Campground = require("../models/campground");
const { descriptors, places } = require("./seedHelpers");

mongoose
  .connect("mongodb://10.166.2.249:27017/yelp-camp")
  .then(() => {
    console.log("Mongo Connection Open!!");
  })
  .catch((e) => {
    console.log("Oh no Mongo error");
    console.log(e);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany();
  for (let i = 0; i < 50; ++i) {
    const rand1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
    });
    await camp.save();
  }
  console.log("Saved!");
};

seedDB().then(() => {
  mongoose.connection.close();
});
