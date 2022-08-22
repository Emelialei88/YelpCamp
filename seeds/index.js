const mongoose = require("mongoose");
const cities = require("./cities");
const Campground = require("../models/campground");
const { descriptors, places } = require("./seedHelpers");

mongoose
  .connect("mongodb://10.166.1.77:27017/yelp-camp")
  .then(() => {
    console.log("Mongo Connection Open!!");
  })
  .catch((e) => {
    console.log("Oh no Mongo error");
    console.log(e);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; ++i) {
    const rand1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "6303c5f0ac73037c8b4a80e5",
      location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "http://source.unsplash.com/collection/483251",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora minima debitis sequi adipisci unde mollitia non enim officiis nostrum, laboriosam omnis molestiae ipsum ratione excepturi. Reprehenderit alias quis rem non.",
      price,
    });
    await camp.save();
  }
  console.log("Saved!");
};

seedDB().then(() => {
  mongoose.connection.close();
});
