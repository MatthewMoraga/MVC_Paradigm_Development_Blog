// importing
const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const isAutheticated = require("../../utilities/isAuth");


// all of the crud routes for getting, creating, updating, and deleting a blog post

// route to get all posts with thier user

router.get("/", isAutheticated, async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User, attributes: ["username"]}],
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// route to get a post by its id with its usernames and comments

router.get("/:id", isAutheticated, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.ids, {
            include: [
                { model: User, attributes: ["username"] },
                {
                    model: Comment,
                    include: [{ model: User, attributes: ["username" ] }],
                },
            ],
        });
        if (!postData) {
            res.status(404).json({ message: "no post id match"});
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// route to write a new blog post and the user is authenticated

router.post("/", isAutheticated, async (req, res) => {
    try {
        const createBlogPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id
        });
        res.status(200).json(createBlogPost);
    } catch (err) {
        res.status(404).json(err);
    }
});

// route to update a post with an autheticated user

router.put("/id", isAutheticated, async (req, res) => {
    try {
        const updatedBlogPost = await Post.update(req.body, {
            where: {id: req.params.id},
        });

        if (!updatedBlogPost) {
            res.status(404).json({ message: "no post id match" });
            return;
        }
        res.status(200).json(updatedBlogPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// route to delete a post with authenticated user 

router.delete("/:id", isAutheticated, async (req, res) => {
    try {
        await Comment.destroy({
            where: { post_id: req.params.id },
        });

        const deleteBlogPost = await Post.destroy({
            where: { id: req.params.id },
        });

        if (!deleteBlogPost) {
            res.status(404).json({ message: "no post id match" });
            return;
        }
        res.status(200).json(deleteBlogPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;


