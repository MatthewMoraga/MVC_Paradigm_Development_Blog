// importing packages and files
const router = require("express").Router();
const User = require("../models/User");

// middleware helper function that checks if a user is autheticated
// then checks that thier user id is stored to req.session.user_id
// if they are not authenticed then the user is redirected to the login page

function isAutheticated(req, res, next) {
    if (!req.session.user_id) {
        return res.redirect("/");
    }
    next();
}

// when the user sends a get request to the dashboard the isAuth function runs
// to check to see if they are authenticated
// then finds the user by id and stores it to a session
// then the dashboard is rendered so that it shows the user their email
// set email to user.email so that it can be used in handlebars html 

router.get("/dashboard", isAutheticated, async (req, res) => {
    const user = await User.findByPk(req.session.user_id);
    res.render("private/dashboard", {
        email: user.email,
        username: user.username
    });
});

router.get("/homepage", isAutheticated, async (req, res) => {
    const user = await User.findByPk(req.session.user_id);
    res.render("private/homepage", {
        email: user.email,
        username: user.username
    });
});

// probably more private routes will be added later

// exporting
module.exports = router;