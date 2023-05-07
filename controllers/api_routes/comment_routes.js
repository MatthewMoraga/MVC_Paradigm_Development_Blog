// importing
const router = require("express").Router();
const { Comment } = require("../../models");
const isAuthenticated = require("../../utilities/isAuth");

// post route to add to Comments the table
// when the user creates a comment then const addComment is
// created with the create method then uses the spread operator to add
// all commments with the body property when the user sends a request
// to the post route and then a comment is made with the attached user id
// otherwise return an error 

router.post("/", async (req, res) => {
    try {
        const addComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(addComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// exporting
module.exports = router;