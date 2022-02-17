"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        }
        else {
            res.locals.currentUserId = userId;
            next();
        }
    }
    catch (error) {
        res.status(401).json({
            auth: false,
            error: error
        });
    }
};
//# sourceMappingURL=auth.middleware.js.map