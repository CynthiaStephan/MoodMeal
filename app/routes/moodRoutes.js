const { Router } = require('express');
const moodController = require('../controllers/moodController');

const router = Router();

router.get('/', moodController.getMoods);
router.post('/', moodController.getTagFormMood)

module.exports = router