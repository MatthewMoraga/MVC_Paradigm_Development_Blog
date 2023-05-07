// importing
const router = require("express").Router();
const { User } = require("../../models");
const isAutheticated = require("../../utilities/isAuth");


// only the get route is needed here as the auth routes are taking care of the rest
// need a get route so that the login route can fetch the users from it
// when login post it gets all of the users and matches what the user enters on the login
// then finds the user from this api route and logs them in otherwise throws an error

router.get("/", (req, res) => {
    User.findAll({
        attributes: { exclude: ["password"] },
    })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});


// exporting
module.exports = router;