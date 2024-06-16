require("dotenv").config();

const User = require("./models/user");

const express = require("express");
const MongoStore = require("connect-mongo");
const routesInit = require("./routes/index_route");
const passport = require("passport");
const session = require("express-session");

const connectDB = require("./config/db");
const app = express();

require("./tools/passport");
const mongoose = require("mongoose");
const PORT = 5000 || process.env.PORT;

app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: "Keep secret",
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
        })
    })
)

app.use(express.urlencoded({extended: true}));
app.use(express.json());

connectDB();
routesInit(app);

app.use(passport.initialize());
app.use(passport.session());


app.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"],
}));
app.get("/auth/google/callback", passport.authenticate('google', {failureRedirect: "/",}),
    async (req, res) => {
        req.session.User = req.session.passport.user;
        console.log(req.session);
        const user = await User.findOne({
            _id: req.session.User,
        })
        return res.status(200).json({
            errorCode: 0,
            user: user,
        })
    });

app.get("/", (req, res) => {
    res.send("Hello world");
    console.log(req.session);
});


app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});