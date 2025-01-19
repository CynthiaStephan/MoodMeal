const { default: mongoose } = require('mongoose');
const recipeModel = require('../models/Recipes');

class recipeController {
    constructor(recipeModel){

        this.recipeModel = recipeModel;
    }

    async getRecipeById(req, res){
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }

        try{
            const recipe = await recipeModel.findById(id);
            if (!recipe){
                res.status(404).json({ error : 'Recipe not found'});
            }
            res.status(200).json(recipe);

        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async getRecipesByTag(req, res){
        const reqTag = req.body.tag;

        try{
            // get recipes by tag into the tags array in the db, retrive all that match
            const recipe = await recipeModel.find({ tags: reqTag });
            if (!recipe){
                res.status(404).json({ error : 'Recipe not found'});
            }
            res.status(200).json(recipe)
            
        } catch(err) {
            res.status(400).json({ error : err.message });
        }
    }

    async getRandomRecipe(req, res){
        try{
            const recipe = await recipeModel.aggregate().sample(1);
            if (!recipe){
                res.status(404).json({ error : 'Error while finding a recipe. Try again'});
            }
            res.status(200).json(recipe);

        } catch(err) {
            res.status(400).json({ error : err.message });
        }
    }


}

module.exports = new recipeController(recipeModel);