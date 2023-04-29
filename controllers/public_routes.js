const router = require("express").Router();

// middleware helper function that checks if a user is logged in
// if not then they are redirected to login
// the user should not see private routes if they are not logged in

function isLoggedIn(req, res, next) {
    if  (req.session.user_id) return res.redirect("/dashboard");
    next()
}

// renders the home page view

router.get("/", isLoggedIn, (req, res) => {
    res.render("index");
});

// renders the login page view

router.get("/login", isLoggedIn, (req, res) => {
    res.render("auth/login");
});

// renders the register page view

router.get("/register", isLoggedIn, (req, res) => {
    res.render("auth/register");
})

// more public routes to be added