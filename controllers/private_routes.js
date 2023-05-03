// importing packages and files
const router = require("express").Router();
const isAutheticated = require("../utilities/isAuth");
const { User, Post, Comment } = require("../models");

// when the user sends a get request to the dashboard the isAuth function runs
// to check to see if they are authenticated
// then finds the user by id and stores it to a session
// then the dashboard is rendered so that it shows the user their email
// set email to user.email so that it can be used in handlebars html 
// now that the routes and authentication are working
// adding error handling and BlogPost finding

router.get("/dashboard", isAutheticated, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {user_id: req.session.user_id},
            include: [{ model: User, attributes: ["username"] }]
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        const user = await User.findByPk(req.session.user_id);
        res.render("private/dashboard", {
            posts,
            email: user.email,
            username: user.username
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// the homepage is where the user will see all of the posts

router.get("/homepage", isAutheticated, async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User, attributes: ["username"] }],
        });
    const posts = postData.map((post) => post.get({ plain: true }));
    const user = await User.findByPk(req.session.user_id);
    res.render("private/homepage", {
        posts,
        email: user.email,
        username: user.username
    });
    } catch (err) {
        res.status(500).json(err);
    } 
});

// route to get the page for an individual post
// find post by id with its username and comments its matched with
// then plain is used to convert the post data to plain javascript

router.get("/post/:id", isAutheticated, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ["username"] },
                {
                    model: Comment,
                    include: [{ model: User, attributes: ["username"] }],
                },
            ],
        });
        const post = postData.get({ plain: true });
        const user = await User.findByPk(req.session.user_id);
        res.render("post", {
            ...post,
            email: user.email,
            username: user.username
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/editpost/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ["username"] },
                {
                    model: Comment,
                    include: [{ model: User, attributes: ["username"] }],
                },
            ],
        });

        const post = postData.get({ plain: true });
        const user = await User.findByPk(req.session.user_id);

        res.render("/editpost", {
            ...post,
            email: user.email,
            username: user.username
        });
    } catch (err) {
        res.status(500).json(err)
    }
});


router.get("/createpost", isAutheticated, async (req, res) => {
    const user = await User.findByPk(req.session.user_id);
    res.render("private/createpost", {
        email: user.email,
        username: user.username
    });
});

// probably more private routes will be added later

// exporting
module.exports = router;