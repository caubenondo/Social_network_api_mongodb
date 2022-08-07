// Require Mongoose and its components for schema
const { Schema, model, Types } = require("mongoose");

// Reactions Schema
const ReactionSchema = new Schema(
    {
        // Set custom ID
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        // Reaction body as String, required
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        // username who create reaction, string, required
        username: {
            type: String,
            required: true,
        },
        // time stamp of created time
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

// Thought Schema
const ThoughtSchema = new Schema(
    {   
        // thoughtTExt, string, required
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        // time stamp
        createdAt: {
            type: Date,
            default: Date.now,
            // Moment
            get: (createdAtVal) => createdAtVal.toLocaleString(),
        },
        // username who created thought
        username: {
            type: String,
            required: true,
        },
        // Use ReactionsSchema to validate data
        reactions: [ReactionSchema],
    },
    // basic setting for JSON output and getters
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// Virtual to get total count of reactions
ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

// Assign thought schema to a model
const Thought = model("Thought", ThoughtSchema);

// Export Thought Module
module.exports = Thought;
