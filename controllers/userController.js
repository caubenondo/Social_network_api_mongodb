// Require Users Model
const { User } = require("../models");


// basic mechanic of controller via mongoo
// 1 capture user request via params or body
// 2 Use those inputs to retrieve data from database
// 3 if data not found, throw error
// 4 if data found, do the work such as CREATE, UPDATE, READ and DELETE and then send response back to clients 

// Set up User Controller
const userController = {
    // Create a new User
    createUsers({ body }, res) {
        User.create(body)
            .then((dbUsersData) => res.json(dbUsersData))
            .catch((err) => res.status(400).json(err));
    },

    // Get All Users
    getAllUsers(req, res) {
        User.find({})
            // populate users thoughts
            .populate({ path: "thoughts", select: "-__v" })
            // populate user friends
            .populate({ path: "friends", select: "-__v" })
            .select("-__v")
            // .sort({_id: -1})
            .then((dbUsersData) => res.json(dbUsersData))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Get single user by ID
    getUsersById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({ path: "thoughts", select: "-__v" })
            .populate({ path: "friends", select: "-__v" })
            .select("-__v")
            // return if no user is found
            .then((dbUsersData) => {
                if (!dbUsersData) {
                    res.status(404).json({
                        message: "No User with this particular ID!",
                    });
                    return;
                }
                res.json(dbUsersData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Update a current User by ID
    updateUsers({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true,
        })
            .then((dbUsersData) => {
                if (!dbUsersData) {
                    res.status(404).json({
                        message: "No User with this particular ID!",
                    });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.json(err));
    },

    deleteUsers({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then((dbUsersData) => {
                if (!dbUsersData) {
                    res.status(404).json({
                        message: "No User with this particular ID!",
                    });
                    return;
                }
                res.json(dbUsersData);
            })
            .catch((err) => res.status(400).json(err));
    },

    // Delete a current user by ID
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $push: { friends: params.friendId } },
            { new: true }
        )
            .populate({ path: "friends", select: "-__v" })
            .select("-__v")
            .then((dbUsersData) => {
                if (!dbUsersData) {
                    res.status(404).json({
                        message: "No User with this particular ID!",
                    });
                    return;
                }
                res.json(dbUsersData);
            })
            .catch((err) => res.json(err));
    },

    // Delete a current Friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .populate({ path: "friends", select: "-__v" })
            .select("-__v")
            .then((dbUsersData) => {
                if (!dbUsersData) {
                    res.status(404).json({
                        message: "No User with this particular ID!",
                    });
                    return;
                }
                res.json(dbUsersData);
            })
            .catch((err) => res.status(400).json(err));
    },
};

// Export module users controller
module.exports = userController;
