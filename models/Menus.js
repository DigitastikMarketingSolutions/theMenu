const mongoose = require("mongoose");

const MenusSchema = new mongoose.Schema({
    menu: {type: Map, of: Array, required: true},
    joint: {type: String, required: true}
})

module.exports = mongoose.models.Menu || mongoose.model('Menu', MenusSchema, 'Menus');