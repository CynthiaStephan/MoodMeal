const { default: mongoose } = require('mongoose');
const recipeModel = require('../models/Recipes');
const moodModel = require('../models/Moods');

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

    async getTagsList(req, res){
        try{
            const tags = await recipeModel.distinct('tags')
            if(!tags){
                return res.status(400).json({ error: "Tags non trouvées" })
            }
            res.status(200).json(tags);
        } catch(err) {
            res.status(400).json({ error : err.message });
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

    async getRecipeSuggestion(req, res){

        const reqBody = req.body;
        
        try{
            if(!reqBody) {
                return res.status(400).json({ error: "Please send a ingredient, mood or tag"})
            }

            else if(reqBody.hasOwnProperty('ingredients')) {
                const recipes = await recipeModel.find({ 
                    ingredients: { $regex: reqBody.ingredients, $options: 'i' } 
                });
                if(!recipes){
                    res.status(404).json({ error : 'Not found'});
                }
                res.status(200).json(recipes)

            } else if(reqBody.hasOwnProperty('moods')) {
                // getting tags form moods first
                const getTagFromMood = await moodModel.find({ 
                    mood: { $regex: reqBody.moods, $options: 'i' }
                })
                
                if(getTagFromMood.lenght === 0){
                    return res.status(400).json({ error: "Mood not valid"})
                }
                const tags = getTagFromMood[0].suggestedTags;
                // then find recipes by tags
                const recipes = await recipeModel.select({ 
                    tags: tags
                });

                if(!recipes){
                    res.status(404).json({ error : 'Not found' });
                }

                res.status(200).json(recipes)
                
            } else if(reqBody.hasOwnProperty('tags')) {
                const recipes = await recipeModel.find({ 
                    tags: { $regex: reqBody.tags, $options: 'i' } 
                });
                if(!recipes){
                    res.status(404).json({ error : 'Not found'});
                }
                res.status(200).json(recipes)

            } else {
                return res.status(400).json({ error: "Erreur" })
            }

            res.status(200).json();

        } catch(err) {
            res.status(400).json({ error : err.message });
        }
    }


}

module.exports = new recipeController(recipeModel);