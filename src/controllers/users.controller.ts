import { Request, Response, NextFunction } from "express"
import { PrismaClient } from "@prisma/client"
import { User } from "@prisma/client"
console.log("test")
import deleteS3object from "../middleware/deleteS3object.middleware"
console.log("test2")
const prisma = new PrismaClient()

const removePassword = (user:User) => {
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
            select: {
                id: true,
                name: true,
                email: true,
                description: true,
                imageUrl: true,
                isAdmin: true,
                createdAt: true,
                posts: { 
                    include: {
                        comments:{ 
                            include: {
                                user: {
                                    select: {
                                        id: true,
                                        name: true,
                                        imageUrl: true,
                                    }
                                }
                            }
                        }, 
                        reactions: true, 
                        user:{
                            select: {
                                id: true,
                                name: true,
                                imageUrl: true,
                                isAdmin: true
                            }
                        }
                    }
                }, 
                comments: true, 
                reactions: true
            }
        })
        res.json(user)
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
            },
            select: {
                id: true,
                name: true,
                email: true,
                description: true,
                imageUrl: true,
                isAdmin: true,
                createdAt: true
            }
        })

        if (user.id !== currentUser.id && !currentUser.isAdmin) {
            return res.status(401).json({ auth: false, error: 'Access denied' })
        }
        if (user.imageUrl) {
            deleteS3object(user.imageUrl)
        }

        await prisma.user.delete({
            where: {
                id: Number(id)
            }
        })
        res.json(user)
    } catch (error) {
        next(error)
    }
}

export const modifyUser = async (req: Request, res: Response, next: NextFunction) => {  
    try {
        const currentUser = res.locals.currentUser
        const { id } = req.params
        const data = req.body
        let fullData:any
        
        if (req.file) {
            const file = req.file  as Express.MulterS3.File
            const imageUrl = file.location
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
            return res.status(401).json({ auth: false, error: 'Access denied' })
        }

        if (user.imageUrl) {
            deleteS3object(user.imageUrl)
        }

        await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: fullData
        })

        const modifiedUser = await prisma.user.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                name: true,
                email: true,
                description: true,
                imageUrl: true,
                isAdmin: true,
                createdAt: true
            }
        })

        res.json(modifiedUser)
    } catch (error) {
        next(error)
    }
}