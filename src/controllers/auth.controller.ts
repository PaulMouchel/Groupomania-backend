import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

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

export const signup = (req: Request, res: Response, next: NextFunction) => {
    bcrypt.hash(req.body.password, 10)
    .then(async hash => {
        const data = req.body
        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hash
            }
        })
        res.json(user)
    })
    .catch(error => res.status(500).json({ error }));
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (!user) {
          return res.status(401).json({ auth: false, error: "Can't find user with this email" });
        } 
        bcrypt.compare(password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ auth: false, error: 'Incorrect password' });
            } 
            const token = jwt.sign(
                { userId: user.id },
                process.env.RANDOM_TOKEN_SECRET,
                { expiresIn: '24h' }
            )
            res.status(200).json({
                auth: true,
                user: JSON.stringify(removePassword(user)),
                token: token
            })
         })
    } catch (error) {
        next(error)
    }
}
