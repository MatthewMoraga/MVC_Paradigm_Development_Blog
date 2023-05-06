// importing

const router = require("express").Router();
const userRoutes = require("./user_routes");
const postRoutes = require("./post_routes");
const commentRoutes = require("./comment_routes");

// set all of the blogpost routes to be affixed with /posts
// set the user routes to be affixed /auth
// set the comment routes to be affixed with /comments

router.use("/posts", postRoutes);
router.use("/users", userRoutes);
router.use("/comments", commentRoutes);

// exporting
module.exports = router;