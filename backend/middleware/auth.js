// middleware/auth.js

module.exports.ensureAuthenticated = (req, res, next) => {
    // console.log(req.user);
    // if (req.user) 
    return next();
    // 
    res.status(401).json({ message: 'Unauthorized' });
};
