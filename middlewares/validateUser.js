const validateUser = (req, res, next) => {
    const username = req.cookies.username;
    if (!username) {
        return res.status(401).send('Unauthorized: Username is required');
    }
    // Perform additional user validation here if needed
    req.username = username;
    next();
};

module.exports = validateUser;
