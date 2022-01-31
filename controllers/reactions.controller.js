const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getAllReactions = async (req, res, next) => {
    try {
        const { postId } = req.params
        const reactions = await prisma.reaction.findMany({
            where: {
                postId: Number(postId)
            },
            include: {user: true}
        })
        res.json(reactions)
    } catch (error) {
        next(error)
    }
}

exports.getOneReaction = async (req, res, next) => {
    try {
        const { postId, id } = req.params
        const reaction = await prisma.reaction.findUnique({
            where: {
                postId: Number(postId),
                id: Number(id)
            },
            // include: {category: true}
        })
        res.json(reaction)
    } catch (error) {
        next(error)
    }
}

exports.createReaction = async (req, res, next) => {
    try {
        const { postId } = req.params
        const data = req.body
        const reaction = await prisma.reaction.create({
            data: data,
            postId: Number(postId)
        })
        res.json(reaction)
    } catch (error) {
        next(error)
    }
}

exports.deleteReaction = async (req, res, next) => {
    try {
        const { postId, id } = req.params
        const reaction = await prisma.reaction.delete({
            where: {
                postId: Number(postId),
                id: Number(id)
            }
        })
        res.json(reaction)
    } catch (error) {
        next(error)
    }
}

exports.modifyReaction = async (req, res, next) => {
    try {
        const { postId, id } = req.params
        const data = req.body
        const reaction = await prisma.reaction.update({
            where: {
                postId: Number(postId),
                id: Number(id)
            },
            data: data,
            // include: {category: true}
        })
        res.json(reaction)
    } catch (error) {
        next(error)
    }
}