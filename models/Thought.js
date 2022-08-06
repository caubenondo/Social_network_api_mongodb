// Require Mongoos and Moment
const { Schema, model, Types } = require("mongoose");

// ReactionsSchema
const ReactionSchema = new Schema(
    {
        // Set custom ID
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
            get: (createdAtVal) => createdAtVal.toLocaleString(),
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

// ThoughtsSchema
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Moment
            get: (createdAtVal) =>
                createdAtVal.toLocaleString()
        },
        username: {
            type: String,
            required: true,
        },
        // Use ReactionsSchema to validate data
        reactions: [ReactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// get total count of reactions
ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
  });
  
  // create the Thoughts model using the Thoughts Schema
  const Thought = model("Thought", ThoughtSchema);
  
  // Export Thoughts Module
  module.exports = Thought;