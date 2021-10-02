const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    name: {type: String, required: true},
    phone: {type: Number, required: true},
    email: {type: String},
})

module.exports = mongoose.models.User || mongoose.model('User', UsersSchema, 'Users');