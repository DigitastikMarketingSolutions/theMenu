const mongoose = require("mongoose");

const JointsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    address: { type: String, required: true},
    directions: { type: String, required: true},
    cuisine: [{ type: String, required: true}],
    opensAt: {type: Number, required: true},
    menu: {type: String, required: true},
    blogs: {type: String},
    photos: {type: String},
    traffic: {type: Map, of: Number}
});

// const h = {"name":"The Wood Apple","address":"Pradhan Nagar, Siliguri","directions":"https://www.google.com/maps/dir/?api=1&destination=26.7285091000,88.4164625000","cuisine":["North Indian","Chinese"],"opensAt":{"$numberDouble":"1000.0"},"menu":{"Soups":[{"name":"Veg Wanton Soup","desc":"Clear soup with veggies and juicy dumplings.","isVeg":true,"spicy":{"$numberDouble":"0.0"},"price":{"$numberDouble":"170.0"}}]},"blogs":[{}],"photos":[]}

module.exports = mongoose.models.Joint || mongoose.model('Joint', JointsSchema, 'Joints');