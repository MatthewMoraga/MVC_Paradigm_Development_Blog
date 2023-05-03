// import express package for router

const router = require("express").Router();

// setting up our routes in index so that
// it can be imported in on the server page as const routes = require("./controllers")
// api routes to be added later for blog posts

const apiRoutes = require("./api_routes");
const homeRoutes = require("./public_routes");
const authRoutes = require("./auth_routes");
const privateRoutes = require("./private_routes");

// sets the api routes to be affixed with /api
// example now blogpost routes are /api/posts 

router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/", authRoutes);
router.use("/", privateRoutes);

// exporting as router
module.exports = router;