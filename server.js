// importing packages
// not everything will be ready for import. I usually start with the server setup as guideline to help me what to decide to do next
// then i setup .env, and connection from there
require("dotenv").config();
const express = require("express");
const expressSession = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(expressSession.Store);
const routes = require("./controllers");
const sequelize = require("./config/connection");
const { engine } = require("express-handlebars");


// PORT also needs to be set for Heroku deployment setting
// setting up port and connection
const app = express();
const PORT = process.env.PORT || 3001;

// setting up a session object since heroku errors connect.session has memory leaks
sessionObject = {
    secret: "some another kind of secret",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

// now we have a sequelize connect.session
app.use(expressSession(sessionObject));



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

// the middleware session
app.use(
    expressSession({
        secret: process.env.SESSION_SECRET,
        store: new SequelizeStore({ db: sequelize }),
        resave: false,
        saveUninitialized: false
    })
)

app.use(routes);

// db sync to start our server with the database
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});