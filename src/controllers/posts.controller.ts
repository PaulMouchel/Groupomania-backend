import { Request, Response, NextFunction } from "express"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                user: true, 
                comments: {
                    include: {
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
                reactions: true
            }
        })
        res.json(posts)
    } catch (error) {
        next(error)
    }
}

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body
        data.userId = Number(data.userId)
        let fullData:any

        if (req.file) {
            const file = req.file  as Express.MulterS3.File
            const imageUrl = file.location
            fullData = {...data, imageUrl:imageUrl}
        } else {
            fullData = data
        }
        const post = await prisma.post.create({
            data: fullData,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        imageUrl: true,
                        isAdmin: true
                    }
                },
                comments: true, 
                reactions:true
            }
        })
        res.json(post)
    } catch (error) {
        next(error)
    }
}

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const currentUser = res.locals.currentUser
        const { id } = req.params

        const post = await prisma.post.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (post.userId !== currentUser.id && !currentUser.isAdmin) {
            return res.status(401).json({ auth: false, error: 'Access denied' })
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

export const modifyPost = async (req: Request, res: Response, next: NextFunction) => {
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
                    user: {
                        select: {
                            id: true,
                            name: true,
                            imageUrl: true,
                            isAdmin: true
                        }
                    },
                    reactions: true,
                    comments: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    imageUrl: true,
                                }
                            }
                        }
                    }
                }
            })
            res.json(post)
        } else {
            return res.status(401).json({ auth: false, error: 'Access denied' })
        }
        
    } catch (error) {
        next(error)
    }
}