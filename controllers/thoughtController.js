// Require Thoughts and Users Models
const { Thought,User } = require("../models");

// basic mechanic of controller via mongoo
// 1 capture user request via params or body
// 2 Use those inputs to retrieve data from database
// 3 if data not found, throw error
// 4 if data found, do the work such as CREATE, UPDATE, READ and DELETE and then send response back to clients


// Set up the Thoughts Controller
const thoughtController = {
    // Creates a new thought
    createThoughts({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then((dbThoughtsData) => {
                if (!dbThoughtsData) {
                    res.status(404).json({
                        message: "No thoughts with this particular ID!",
                    });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch((err) => res.json(err));
    },

    // Getting all available Thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({ path: "reactions", select: "-__v" })
            .select("-__v")
            // .sort({_id: -1})
            .then((dbThoughtsData) => res.json(dbThoughtsData))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Getting a certain thought by ID
    getThoughtsById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({ path: "reactions", select: "-__v" })
            .select("-__v")
            .then((dbThoughtsData) => {
                if (!dbThoughtsData) {
                    res.status(404).json({
                        message: "No thoughts with this particular ID!",
                    });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // Updating a current thought by ID
    updateThoughts({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true,
        })
            .populate({ path: "reactions", select: "-__v" })
            .select("-___v")
            .then((dbThoughtsData) => {
                if (!dbThoughtsData) {
                    res.status(404).json({
                        message: "No thoughts with this particular ID!",
                    });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch((err) => res.json(err));
    },

    // Deleting a current thought by ID
    deleteThoughts({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then((dbThoughtsData) => {
                if (!dbThoughtsData) {
                    res.status(404).json({
                        message: "No thoughts with this particular ID!",
                    });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch((err) => res.status(400).json(err));
    },

    // creating a new Reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .populate({ path: "reactions", select: "-__v" })
            .select("-__v")
            .then((dbThoughtsData) => {
                if (!dbThoughtsData) {
                    res.status(404).json({
                        message: "No thoughts with this particular ID!",
                    });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch((err) => res.status(400).json(err));
    },

    // Deleting a reaction by ID
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then((dbThoughtsData) => {
                if (!dbThoughtsData) {
                    res.status(404).json({
                        message: "No thoughts with this particular ID!",
                    });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch((err) => res.status(400).json(err));
    },
};

// Export module thought controller
module.exports = thoughtController;
