const { Schema, model } = require('mongoose');

// Reaction subdocument
const friendSchema = new Schema(
    {
        friendId: {
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
            get: (date) => timeSince(date),
            // use getter method to format the timestamp
        },
    }
);


const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator: function (email) {
                    // regex for email
                    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-+[a-zA-Z]{2,4}$/;
                    return emailRegex.test(email);
                },
            }

        },
        thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
        // friends: an array of _id values referencing the User model(self-reference) 
        friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],   
    },
    {
        toJSON: {
          getters: true,
        },
    }
);

// uses mongoose.model() to create a model
const User = model('user', userSchema);

module.exports = User;