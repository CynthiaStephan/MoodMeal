const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    lastName: { 
        type: String, 
        required: true
    },
    firstName: { 
        type: String, 
        required: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    password: { 
        type: String, 
        required: true
    },
    preferences: {
        allergies: {
            type: [String],
            default: []
        },
        diet: {
            type: String,
            enum: ['vegetarian', 'vegan', 'gluten-free', 'omnivore']
        }
    },
    savedRecipes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Recipe',
        default: []
    }
});

module.exports = mongoose.model('User', userSchema);