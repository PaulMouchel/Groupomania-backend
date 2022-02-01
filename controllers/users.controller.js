const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const removePassword = (user) => {
    return Object.keys(user).filter(key =>
        key !== 'password').reduce((obj, key) =>
        {
            obj[key] = user[key];
            return obj;
        }, {}
    )
}

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany()
        res.json(users)
    } catch (error) {
        next(error)
    }
}

exports.getOneUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                posts: { 
                    include: {
                        comments:{ 
                            include: {
                                user: true
                            }
                        }, 
                        reactions: true, 
                        user:true
                    }
                }, 
                comments: true, 
                reactions: true}
        })
        res.json(removePassword(user))
    } catch (error) {
        next(error)
    }
}

exports.createUser = async (req, res, next) => {
    try {
        const data = req.body
        const user = await prisma.user.create({
            data: data
        })
        res.json(removePassword(user))
    } catch (error) {
        next(error)
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await prisma.user.delete({
            where: {
                id: Number(id)
            }
        })
        res.json(removePassword(user))
    } catch (error) {
        next(error)
    }
}

exports.modifyUser = async (req, res, next) => {
    
    try {
        const { id } = req.params
        const data = req.body
        const user = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: data
        })
        res.json(removePassword(user))
    } catch (error) {
        next(error)
    }
}