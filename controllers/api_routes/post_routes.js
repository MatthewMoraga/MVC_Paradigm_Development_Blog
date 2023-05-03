// importing
const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const isAutheticated = require("../../utilities/isAuth");


// all of the crud routes for getting, creating, updating, and deleting a blog post
// also includes try catch error handling

// route to get all posts with thier user with authentication
// the postData finds all of the data from post to include the username from the User model
// then if success it runs json postData if not the user gets returned a 500 error 

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
// postData here findsbyPK since it is searching by id on this route
// as it findsbyPK it does an include with the username from the User model and the username attached to the Comment model
// since it is finding the comments as well
// if the there is no postData send the user a 404 error and message otherwise on success then postData json
// if there is an error in general throw a 500 error


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
// the createBlogPost object uses the Post model and the create method to let the user
// make a request through json then the spread operator is used on req.body so that when
// the user makes a new blogpost what they write is sent as json data
// then it attaches the users id to the post so that when they go to the dashboard page 
// they only see their posts, and they see all posts on the home page
// if successfull post blogPost to /api/posts otherwise throw a 404 error

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

// route to update a post with and the user is autheticated
// the posts cand be edited as well through a put route 
// updatedBlogPost uses the Post model and update method where it searches req.body
// so that the user can see what they wrote and then where finds the post by its id 
// and matches it with the user so that the user can only change their blogposts
// if there is update throw a 404 errror
// if successful respond back with the json update so that the user can see the update
// to thier post otherwise throw a 500 error

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

// route to delete a post with and the user is authenticated
// when the user hits the delete button data attached to the Comment model is
// deleted with the destroy method then the deleteBlogPost uses the destroy
// method to delete its post and any comments attached to it
// if no delete request throw a 404 error
// on success respond back with the json deleteBlogPost to delete from /api/posts
// otherwise if error throw a 500 error

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

// exporting
module.exports = router;


