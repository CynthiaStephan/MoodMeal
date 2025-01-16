const mongoose = require('mongoose')

const moodSchema = new mongooose.Shema({
    _id: {
        type: String,
        required: true,
        index: true
    },
    mood: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    suggestedTags: {
        type: [string],
        required: true,
        default: []
    },
    funMessage: {
        type: [String]
    }
})

module.exports = mongoose.model('Mood', moodSchema);