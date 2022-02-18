import { Request, Response, NextFunction } from "express"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const createComment = async (req:Request, res:Response, next:NextFunction) => {
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

export const deleteComment = async (req:Request, res:Response, next:NextFunction) => {
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

        const deletedComment = await prisma.comment.delete({
            where: {
                id: Number(id)
            }
        })
        res.json(deletedComment)
    } catch (error) {
        next(error)
    }
}

export const modifyComment = async (req:Request, res:Response, next:NextFunction) => {
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
                user: {
                    select: {
                        id: true,
                        name: true,
                        imageUrl: true,
                    }
                }
            }
        })
        res.json(newComment)
    } catch (error) {
        next(error)
    }
}