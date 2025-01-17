const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
    mood: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    suggestedTags: {
        type: [String],
        required: true,
        default: []
    },
    funMessage: {
        type: [String],
        default: []
    }
})

module.exports = mongoose.model('Mood', moodSchema);