const router = require("express").Router();
const { User } = require("../../models");
const isAutheticated = require("../../utilities/isAuth");

// only the get route is needed here as the auth routes are taking care of the rest

router.get("/users", isAutheticated, (req, res) => {
    User.findAll({
        attributes: { exclude: ["password"] },
    })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;