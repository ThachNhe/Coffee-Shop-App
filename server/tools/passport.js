const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require("../models/user");
const {Strategy: LocalStrategy} = require("passport-local");
const bcrypt = require("bcrypt");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
});

passport.use(
    new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        let user = await User.findOne({googleId: profile.id});
        if (!user) {
            user = await User.create({
                googleId: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName,
            });

        }
        return done(null, user);
    }));

