// importing packages 
const router = require("express").Router();
const User = require("../models/User");

// login post route for the user to send a post req to the the login page form
// const user_data is the form data for email/password from the User model
// then we find the user by email address using the findOne method
// then if no user by email is found redirect them to the root page
// then we check the users password submit matches the encrypted pass in the db
// then if no password matches redirect the user to the root page
// if there is a succesfull login we store the user id to session and send them
// to the dashbaord page
// added username

router.post("/auth/login", async (req, res) => {
    const user_data = req.body;

    const user = await User.findOne({
        where: {
            email: user_data.email,
        }
    });

    if (!user) return res.redirect("/");

    
    const validPassword = await user.validatePass(user_data.password);
    if (!validPassword) return res.redirect("/");
    

    
    req.session.user_id = user.id;
    req.session.username = user.username;
    res.redirect("/dashboard");
});

// register post route for the user to send a post req to the register page form
// const user_data is the form data for email and password from the User model
// code block is run with try here so that it can catch an error if one is thrown
// if a user is successfully create thier id is stored to session storage
// and then they are redirected to the dashboard
// then if an error is thrown it is caught and the user is redirected to the login page

router.post("/auth/register", async (req, res) => {
    const user_data = req.body;

    try {
        const user = await User.create(user_data);

        req.session.user_id = user.id;
        req.session.username = user.username;
        res.redirect("/dashboard");
    } catch (err) {
        res.redirect("/");
    }
});

// logout get route that logs a user out when they press a button
// then the destroy method is run and removes the session data
// then the user is redirected back to the root page

router.get("/auth/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;

    
    




