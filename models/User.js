// Require Mongoose
const { Schema, model } = require("mongoose");
// Schema for User model
const UserSchema = new Schema(
    {
        // username, unique name, string, required, trim opt 
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        // email, match email regx, unique and required
        email: {
            type: String,
            required: true,
            unique: true,
            // use REGEX to validate correct email
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
        },
        // associate with Thought Model, equivelent with use model keys as foreign keys in SQL
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],
        // associate with itself as a model, 
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        // basic JSON output setting and Virtual
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// Virtual to get total count of friends
UserSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

// create the Users model using the Users Schema
const User = model("User", UserSchema);

// Export User module
module.exports = User;
