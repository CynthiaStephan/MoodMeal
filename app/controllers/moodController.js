const moodModel = require('../models/Moods')
class moodController {
    
    constructor(moodModel){
        this.moodModel = moodModel;
    }

    async getMoods(req, res) {
        try{
            const moods = await moodModel.find();
            res.status(200).json(moods);
        } catch(err) {
            res.status(400).json({ error : err.message });
        }
    }
    
    async getTagFormMood(req, res) {
        try{
            const moods = await moodModel.find();
            res.status(200).json(moods);
        } catch(err) {
            res.status(400).json({ error : err.message });
        }
    }
}

module.exports = new moodController(this.moodModel);