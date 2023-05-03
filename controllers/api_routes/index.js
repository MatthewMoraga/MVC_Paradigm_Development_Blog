// importing

const router = require("express").Router();
const postRoutes = require("./post_routes");

// set all of the blogpost routes to be affixed with /posts

router.use("/posts", postRoutes);

// exporting
module.exports = router;