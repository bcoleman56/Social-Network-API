const { Schema, Types } = require('mongoose');
const reactionsSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
        // create virtual called reaction count
    },
)

module.exports = thoughtSchema;