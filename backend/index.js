const express = require('express')
const connectDB = require('./config/db')
const app = express()
const session = require('express-session');
const bodyParser = require('body-parser')
const postRoutes = require('./routes/posts')
const authRoutes = require('./routes/auth')
// const commentRoutes = require('./routes/comments')
const passport = require('passport')
require('./auth/index')

const port = 3000
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(bodyParser.json())
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
// app.use('/api/comments', commentRoutes);
app.use(passport.initialize());



// function isLoggedIn(req, res, next) {
//     req.user ? next() : res.sendStatus(401);

// }

connectDB();


// app.get('/auth/google',
//     passport.authenticate('google', {
//         scope:
//             ['email', 'profile']
//     }
//     ));

// app.get('/auth/google/callback',
//     passport.authenticate('google', {
//         successRedirect: '/auth/google/success',
//         failureRedirect: '/auth/google/failure'
//     }));

// app.get('/auth/google/success', (req, res) => {
//     res.send('Success')
// });

// app.get('/auth/google/failure', (req, res) => {
//     res.send('failure')
// });

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})