const moodModel = require('../models/Moods')
class moodController {
    
    constructor(moodModel){
        this.moodModel = moodModel;
    }

    async getMoods(req, res) {
        try{
            const moods = await moodModel.find();
            if (!moods){
                return res.status(404).json({ error : 'Moods not found'});
            }
            res.status(200).json(moods);
        } catch(err) {
            res.status(400).json({ error : err.message });
        }
    }
    
    async getTagFormMood(req, res) {
        const mood = req.body.mood;
        
        try{
            const moodInfo = await moodModel.find({ mood: mood });

            if (!moodInfo){
                return res.status(404).json({ error : 'Mood not found'});
            }

            const associatedTags = moodInfo[0].suggestedTags;
            res.status(200).json(associatedTags);

        } catch(err) {
            res.status(400).json({ error : err.message });
        }
    }
}

module.exports = new moodController(this.moodModel);