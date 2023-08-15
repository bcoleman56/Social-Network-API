const { Schema, Types } = require('mongoose');
const thoughtSchema = require('./Thought')

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
        thoughts: [thoughtSchema],
        // friends: an array of _id values referencing the User model(self-reference)       
    },

);

module.exports = userSchema;