const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await prisma.post.findMany({
          include: {user: true, comments: true, reactions: true}
        })
        res.json(posts)
    } catch (error) {
        next(error)
    }
}

exports.getOnePost = async (req, res, next) => {
    try {
        const { id } = req.params
        const post = await prisma.post.findUnique({
            where: {
                id: Number(id)
            },
            // include: {category: true}
        })
        res.json(post)
    } catch (error) {
        next(error)
    }
}

exports.createPost = async (req, res, next) => {
    try {
        const data = req.body
        const post = await prisma.post.create({
            data: data,
            include: {user: true, comments: true}
        })
        res.json(post)
    } catch (error) {
        next(error)
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        const { id } = req.params
        const post = await prisma.post.delete({
            where: {
                id: Number(id)
            }
        })
        res.json(post)
    } catch (error) {
        next(error)
    }
}

exports.modifyPost = async (req, res, next) => {
    try {
        const { id } = req.params
        const data = req.body
        const post = await prisma.post.update({
            where: {
                id: Number(id)
            },
            data: data,
            // include: {category: true}
        })
        res.json(post)
    } catch (error) {
        next(error)
    }
}