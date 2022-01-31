const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// exports.getAllComments = async (req, res, next) => {
//     try {
//         const { postId } = req.params
//         const comments = await prisma.comment.findMany({
//             where: {
//                 postId: Number(postId)
//             }
//         //   include: {category: true}
//         })
//         res.json(comments)
//     } catch (error) {
//         next(error)
//     }
// }

// exports.getOneComment = async (req, res, next) => {
//     try {
//         const { postId, id } = req.params
//         const comment = await prisma.comment.findUnique({
//             where: {
//                 postId: Number(postId),
//                 id: Number(id)
//             },
//             // include: {category: true}
//         })
//         res.json(comment)
//     } catch (error) {
//         next(error)
//     }
// }

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
        const { id } = req.params
        const comment = await prisma.comment.delete({
            where: {
                id: Number(id)
            }
        })
        res.json(comment)
    } catch (error) {
        next(error)
    }
}

// exports.modifyComment = async (req, res, next) => {
//     try {
//         const { postId, id } = req.params
//         const data = req.body
//         const comment = await prisma.comment.update({
//             where: {
//                 postId: Number(postId),
//                 id: Number(id)
//             },
//             data: data,
//             // include: {category: true}
//         })
//         res.json(comment)
//     } catch (error) {
//         next(error)
//     }
// }