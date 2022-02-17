import { Request, Response, NextFunction } from "express";
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const currentUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = res.locals.currentUserId
        const currentUser = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true, isAdmin: true
            }
        })
        if (!currentUser) {
            throw 'Invalid user Id';
        } else {
            res.locals.currentUser = currentUser
            next();
        }
    } catch (error) {
        res.status(401).json({
            auth: false, 
            error: error
        });
    }
};

export default currentUser