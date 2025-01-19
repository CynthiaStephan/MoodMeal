const { Router } = require('express');
const recipeController = require('../controllers/recipeController');
const { route } = require('./moodRoutes');

const router = Router();

router.get('/recipe/:id', recipeController.getRecipeById);
router.get('/tag', recipeController.getRecipesByTag);
router.get('/random', recipeController.getRandomRecipe);

module.exports = router;