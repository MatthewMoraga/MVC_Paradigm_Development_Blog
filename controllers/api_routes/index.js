// importing

const router = require("express").Router();
const postRoutes = require("./post_routes");

router.use("/posts", postRoutes);

// exporting
module.exports = router;