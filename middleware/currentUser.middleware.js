const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = async (req, res, next) => {
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

