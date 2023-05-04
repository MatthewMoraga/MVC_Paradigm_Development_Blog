// importing

const router = require("express").Router();
const postRoutes = require("./post_routes");
const userRoutes = require("./user_routes");

// set all of the blogpost routes to be affixed with /posts

router.use("/posts", postRoutes);
router.use("/auth", userRoutes)

// exporting
module.exports = router;