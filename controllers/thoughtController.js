const { Thought } = require('../models');


//     allThoughts,
//     createThought,
//     getSingleThoght,
//     addThoughtReaction,
//     removeThoughtReaction,

module.exports = {
    // Get all thoughts
    async allThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Create thought
    async createThought(req, res) {
        
    }
}