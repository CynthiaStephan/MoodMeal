const mongoose = require('mongoose')

const recipeShema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        default: []
    },
    instructions: {
        type: [String],
        default: []
    },
    image: {
        type: String,
    },
    tags: {
        type: [String],
        default: []
    }

})

module.exports = mongoose.model('Recipe', recipeShema)