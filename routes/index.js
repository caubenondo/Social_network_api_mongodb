// Require express router
const router = require("express").Router();

// Import all of the API routes
const apiRoutes = require("./api");

// add prefix of `/api` to all of the api routes
router.use("/api", apiRoutes);

// 404 Status error message if user access to other routes that not api
router.use((req, res) => {
  res.status(404).send("<h1>404 Error....</h1>");
});

// Module exports router
module.exports = router;