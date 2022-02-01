const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await prisma.post.findMany({
          include: {user: true, comments: {include: {user:true}}, reactions: true}
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
        })
        res.json(post)
    } catch (error) {
        next(error)
    }
}

exports.createPost = async (req, res, next) => {
    try {
        const data = req.body
        data.userId = Number(data.userId)
        let fullData
        if (req.file) {
            const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            fullData = {...data, imageUrl:imageUrl}
        } else {
            fullData = data
        }
        const post = await prisma.post.create({
            data: fullData,
            include: {user: true, comments: true, reactions:true}
        })
        res.json(post)
    } catch (error) {
        next(error)
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET)
        const userId = decodedToken.userId
        const { id } = req.params
        console.log(id, userId)
        const posts = await prisma.post.deleteMany({
            where: {
                id: Number(id),
                userId: userId 
            }
        })
        res.json(posts)
    } catch (error) {
        console.log(error)
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