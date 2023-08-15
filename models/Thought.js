const { Schema, Types, model  } = require('mongoose');


// Reaction subdocument
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // use getter method to format the timestamp
        }
    }
);



// defines the thought schema
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
        // array of reactions
        reactions: [reactionSchema],
    },
    {
        toJSON: {
          getters: true,
        },
    }
)

// create a virtual property called reaction count
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})


// initialize model
const Thought = model('thought', thoughtSchema);



module.exports = Thought;