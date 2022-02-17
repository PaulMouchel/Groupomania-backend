"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new client_1.PrismaClient();
const removePassword = (user) => {
    return Object.keys(user).filter(key => key !== 'password').reduce((obj, key) => {
        obj[key] = user[key];
        return obj;
    }, {});
};
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => __awaiter(void 0, void 0, void 0, function* () {
        const data = req.body;
        const user = yield prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hash
            }
        });
        res.json(user);
    }))
        .catch(error => res.status(500).json({ error }));
};
exports.login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user) {
            return res.status(401).json({ auth: false, error: "Can't find user with this email" });
        }
        bcrypt.compare(password, user.password)
            .then(valid => {
            if (!valid) {
                return res.status(401).json({ auth: false, error: 'Incorrect password' });
            }
            const token = jwt.sign({ userId: user.id }, process.env.RANDOM_TOKEN_SECRET, { expiresIn: '24h' });
            res.status(200).json({
                auth: true,
                user: JSON.stringify(removePassword(user)),
                token: token
            });
        });
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=auth.controller.js.map