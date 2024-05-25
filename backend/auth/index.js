const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const { User } = require('../model');
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
},
    async function (request, accessToken, refreshToken, profile, done) {
        try {
            // Check if the user already exists in the database
            let user = await User.findOne({ googleId: profile.id });
            if (user) {
                return done(null, user);
            }
            // If the user does not exist, create a new user
            user = new User({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value
            });
            await user.save();
            return done(null, user);
        } catch (err) {
            return done(err, false, err.message);
        }
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});