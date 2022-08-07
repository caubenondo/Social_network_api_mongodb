// Require express router
const router = require("express").Router();

// Set requirements (from thoughts-controller)
const {
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction,
} = require("../../controllers/thoughtController");

// NOTE: we do it this way to separate complex controller and API routes
// it's also more sematic to understand from the top down


// Handle /api/thoughts <GET>
router.route("/").get(getAllThoughts);

// Handle /api/thoughts/:id <GET, PUT, DELETE>
router
    .route("/:id")
    .get(getThoughtsById)
    .put(updateThoughts)
    .delete(deleteThoughts);

// Handle /api/thoughts/:userId <POST>
router.route("/:userId").post(createThoughts);

// Handle /api/thoughts/:thoughtId/reactions <POST>
router.route("/:thoughtId/reactions").post(addReaction);

// Handle  /api/thoughts/:thoughtId/reactionId <DELETE>
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

// Export module router
module.exports = router;
