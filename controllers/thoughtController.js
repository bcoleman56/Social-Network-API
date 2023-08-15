const { Thought, User } = require('../models');

//     allThoughts,
//     createThought,
//     getSingleThought,
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
        try {
            const newThought = await Thought.create(req.body);

            // update user
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: newThought._id }},
                { new: true}
            );

            if (!user) {
                return res.status(404).json({message: "Thought created, but no user with this id"})
            }
            
            res.json({ message: "Thought created" });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // get thought by id
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that id' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(400)
        }
    },

    //     addThoughtReaction,

    async addThoughtReaction(req, res) {
        try {
            console.log("add thought reaction")
            // ADD THOUGHT REACTION
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    //     removeThoughtReaction,
    async removeThoughtReaction(req, res) {
        try {  
            console.log("remove thought reaction")
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

   
}