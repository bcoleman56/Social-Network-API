const router = require('express').Router();

const {
    // different functions from our controller.js
    allThoughts,
    createThought,
    getSingleThought,
    addThoughtReaction,
    removeThoughtReaction,
    
} = require('../../controllers/thoughtController');

// /api/thoughts/
router.route('/').get(allThoughts).post(createThought);

// get single thought
router.route('/:thoughtId').get(getSingleThought)

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addThoughtReaction).delete(removeThoughtReaction)

module.exports = router;