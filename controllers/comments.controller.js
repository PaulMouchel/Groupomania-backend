const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.createComment = async (req, res, next) => {
    try {
        const data = req.body
        const comment = await prisma.comment.create({
            data: data,
            include: {user: true}
        })
        res.json(comment)
    } catch (error) {
        next(error)
    }
}

exports.deleteComment = async (req, res, next) => {
    try {
        const currentUser = res.locals.currentUser

        const { id } = req.params

        const comment = await prisma.comment.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (comment.userId !== currentUser.id && !currentUser.isAdmin) {
            throw Error
        }

        const deletedcomment = await prisma.comment.delete({
            where: {
                id: Number(id)
            }
        })
        res.json(deletedcomment)
    } catch (error) {
        next(error)
    }
}

exports.modifyComment = async (req, res, next) => {
    try {
        const currentUser = res.locals.currentUser

        const { id } = req.params
        const data = req.body

        const comment = await prisma.comment.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (comment.userId !== currentUser.id && !currentUser.isAdmin) {
            throw Error
        }

        const newComment = await prisma.comment.update({
            where: {
                id: Number(id)
            },
            data: data,
            include: {
                user: true
            }
        })
        res.json(newComment)
    } catch (error) {
        next(error)
    }
}