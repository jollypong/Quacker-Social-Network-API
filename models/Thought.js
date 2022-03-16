const { Schema, model } = require('mongoose');
const reactionSchema = require ('./Reaction');

//helper function for date
const formatDate = require('../utils/formatDate');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => formatDate(timestamp),
        },
        username:
        {
            type: String,
            required: true, 
        },
        reaction: [
            reactionSchema
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reaction.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;