// importing packages
// not everything will be ready for import. I usually start with the server setup as guideline to help me what to decide to do next
// then i setup .env, and connection from there
require("dotenv").config();
const express = require("express");
const expressSession = require("express-session");
const db = require("./config/connection");
const { engine } = require("express-handlebars");
const routes = require("./controllers");


// PORT also needs to be set for Heroku deployment setting
// setting up port and connection
const app = express();
const PORT = process.env.PORT || 3001;




// middleware for allowing the client to send through json data
app.use(express.json());

// middleware for allowing the client to send standard form data
app.use(express.urlencoded({ extended: true }));

// importing our public folders
app.use(express.static("public"));

// setting up the view engine for handlebar template
app.engine("hbs", engine({
    extname: ".hbs",
    helpers: require("./utilities/helpers/date_format")
}));
app.set("view engine", "hbs");
app.set("views", "./views");

// setting up the session for the routes
app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: false,
}));

app.use(routes);

// db sync to start our server with the database
db.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});