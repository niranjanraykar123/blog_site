const express = require('express')
const connectDB = require('./config/db')
const app = express()
const cors = require('cors')
const session = require('express-session');
const bodyParser = require('body-parser')
const postRoutes = require('./routes/posts')
const authRoutes = require('./routes/auth')
const commentRoutes = require('./routes/comments')

const path = require('path')
// const commentRoutes = require('./routes/comments')
const passport = require('passport')
require('./auth/index')
app.use(cors({
    origin: true,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));
const port = 3000
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.cookieParser());
app.use(bodyParser.json())
// app.use('/api/comments', commentRoutes);
app.use(passport.initialize());
app.use(passport.session());
// app.use(app.router);
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);



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
