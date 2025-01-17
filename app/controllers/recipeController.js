const recipeModel = require('../models/Recipes');

class recipeController {
    constructor(recipeModel){
        this.recipeModel = recipeModel;
    }

    async test(req, res){

    }
}

module.exports = new recipeController(recipeModel)