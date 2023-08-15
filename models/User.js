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
            // use getter method to format the timestamp
        }
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
            
            // use validation to check
            //       if email is valid
        },
        thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
        // friends: an array of _id values referencing the User model(self-reference) 
        friends: [{ type: Schema.Types.ObjectId, ref: 'user' }],   
    },

);

// uses mongoose.model() to create a model
const User = model('user', userSchema);

module.exports = User;