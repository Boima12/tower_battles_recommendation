const jwt = require('jsonwebtoken');
const Account = require('../models/Account');
const { UnauthenticatedError } = require('../errors');

const auth = async (req, res, next) => {
    // check header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Authentication invalid');
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Account.findById(payload.userId).select('-password');

        if (!user) {
            throw new UnauthenticatedError('User not found');
        }

        req.user = user; // attach full user object
        next();
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid');
    }
};

module.exports = auth;
