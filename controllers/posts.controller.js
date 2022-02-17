const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

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
        const currentUser = res.locals.currentUser
        const { id } = req.params

        const post = await prisma.post.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (post.userId !== currentUser.id && !currentUser.isAdmin) {
            throw Error
        }

        const deletedPost = await prisma.post.delete({
            where: {
                id: Number(id)
            }
        })
        res.json(deletedPost)
    } catch (error) {
        next(error)
    }
}

exports.modifyPost = async (req, res, next) => {
    try {
        const currentUser = res.locals.currentUser
        const { id } = req.params
        const data = req.body

        let fullData
        if (req.file) {
            const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            fullData = {...data, imageUrl:imageUrl}
        } else {
            fullData = data
        }

        const oldPost = await prisma.post.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (oldPost.userId === currentUser.id || currentUser.isAdmin) {
            const post = await prisma.post.update({
                where: {
                    id: Number(id)
                },
                data: fullData,
                include: {
                    user: true,
                    reactions: true,
                    comments: {
                        include: {
                            user: true
                        }
                    }
                }
            })
            res.json(post)
        } else {
            throw error
        }
        
    } catch (error) {
        next(error)
    }
}