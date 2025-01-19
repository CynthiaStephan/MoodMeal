const { Router } = require('express');
const recipeController = require('../controllers/recipeController');
const { route } = require('./moodRoutes');

const router = Router();

router.get('/recipe/:id', recipeController.getRecipeById);
router.get('/tag', recipeController.getRecipesByTag);
router.get('/alltags', recipeController.getTagsList);
router.get('/random', recipeController.getRandomRecipe);
router.post('/suggestion', recipeController.getRecipeSuggestion);

module.exports = router;