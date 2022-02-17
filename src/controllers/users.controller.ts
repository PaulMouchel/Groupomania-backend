import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
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

export const getOneUser = async (req: Request, res: Response, next: NextFunction) => {
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

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
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

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const currentUser = res.locals.currentUser
        const { id } = req.params

        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (user.id !== currentUser.id && !currentUser.isAdmin) {
            throw Error
        }

        const deletedUser = await prisma.user.delete({
            where: {
                id: Number(id)
            }
        })
        res.json(removePassword(deletedUser))
    } catch (error) {
        next(error)
    }
}

export const modifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const currentUser = res.locals.currentUser
        const { id } = req.params
        const data = req.body
        let fullData
        if (req.file) {
            const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            fullData = {...data, imageUrl:imageUrl}
        } else {
            fullData = { name: data.name, description: data.description }
        }

        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (user.id !== currentUser.id && !currentUser.isAdmin) {
            throw Error
        }

        const modifiedUser = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: fullData
        })
        res.json(removePassword(modifiedUser))
    } catch (error) {
        next(error)
    }
}