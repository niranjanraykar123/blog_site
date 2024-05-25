
const express = require('express');
const passport = require('passport');
const { ensureAuthenticated } = require('../middleware/auth');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('hello')
});

router.get('/current_user', ensureAuthenticated, (req, res) => {
    if (req.user)
        res.json(req.user);
    else
        res.json({ err: "not logged in" })
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/login/success', (req, res) => {
    res.redirect('http://localhost:5173/posts');
});

router.get('/google/callback',
    passport.authenticate("google", {
        successRedirect: "/auth/login/success",
        failureRedirect: "/auth/login/failed",
    })
);
// Logout user
router.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;
