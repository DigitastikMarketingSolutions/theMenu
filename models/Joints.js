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
    traffic: {type: Map, of: Map},
    phone: {type: String}
});

module.exports = mongoose.models.Joint || mongoose.model('Joint', JointsSchema, 'Joints');