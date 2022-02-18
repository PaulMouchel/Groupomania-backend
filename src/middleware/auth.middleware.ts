import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET)
        const userId = (<any>decodedToken).userId
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            res.locals.currentUserId = userId
            next()
        }
    } catch (error) {
        res.status(401).json({
            auth: false, 
            error: error
        });
    }
};

export default auth