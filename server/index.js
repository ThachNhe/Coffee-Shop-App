require("dotenv").config();

const express = require("express");
const MongoStore = require("connect-mongo");
const routesInit = require("./routes/index_route");
const passport = require("passport");
const session = require("express-session");

const connectDB = require("./config/db");
const {urlencoded} = require("express");

const app = express();

require("./tools/passport");
const PORT = 5000 || process.env.PORT;

app.use(urlencoded());

app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: "Keep secret",
    })
)

connectDB();
routesInit(app);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"],
}));
app.get("/auth/google/callback", passport.authenticate('google', {failureRedirect: "/",}),
    (req, res) => {
        res.redirect("/");
    });

app.get("/", (req, res) => {
    res.send("Hello world");
})
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});