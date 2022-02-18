import { Request, Response, NextFunction } from "express"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const createReaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body
        const reaction = await prisma.reaction.create({
            data: data
        })
        res.json(reaction)
    } catch (error) {
        next(error)
    }
}

export const deleteReaction = async (req: Request, res: Response, next: NextFunction) => {
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

export const modifyReaction = async (req: Request, res: Response, next: NextFunction) => {
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