const router = requires('express').Router();

const {
    // different functions from our controller.js
    allThoughts,
    createThought,
    getSingleThoght,
    addThoughtReaction,
    removeThoughtReaction,
    
} = require('../../controllers/userController');

// /api/thoughts/
router.route('/').get(allThoughts).post(createThought);

// get single thought
router.route('/:thoughtId').get(getSingleThoght)

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addThoughtReaction).delete(removeThoughtReaction)

module.exports = router;