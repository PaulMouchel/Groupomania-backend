const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.createReaction = async (req, res, next) => {
    try {
        const data = req.body
        console.log(data)
        const reaction = await prisma.reaction.create({
            data: data
        })
        res.json(reaction)
    } catch (error) {
        next(error)
    }
}

exports.deleteReaction = async (req, res, next) => {
    try {
        const { id } = req.params
        const reaction = await prisma.reaction.delete({
            where: {
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
        const { id } = req.params
        const data = req.body
        const reaction = await prisma.reaction.update({
            where: {
                id: Number(id)
            },
            data: data,
        })
        res.json(reaction)
    } catch (error) {
        next(error)
    }
}