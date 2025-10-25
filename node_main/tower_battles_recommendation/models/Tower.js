const mongoose = require('mongoose');

const towerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    tower_icon: {
        type: String,
        required: true,
    },
    unlock_price: {
        type: Number,
        required: true,
    },
    placement_price: {
        type: Number,
        required: true,
    },
    rank: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    pair_with: {
        type: [String],
        default: [],   
    }
})

module.exports = mongoose.model('Tower', towerSchema)