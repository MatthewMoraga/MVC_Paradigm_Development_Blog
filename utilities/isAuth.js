// middleware helper function that checks if a user is autheticated
// then checks that thier user id is stored to req.session.user_id
// if they are not authenticed then the user is redirected to the login page

function isAutheticated(req, res, next) {
    if (!req.session.user_id) {
        return res.redirect("/");
    }
    next();
}

module.exports = isAutheticated;