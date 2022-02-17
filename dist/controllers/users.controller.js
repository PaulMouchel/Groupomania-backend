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
const prisma = new client_1.PrismaClient();
const removePassword = (user) => {
    return Object.keys(user).filter(key => key !== 'password').reduce((obj, key) => {
        obj[key] = user[key];
        return obj;
    }, {});
};
exports.getOneUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield prisma.user.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                posts: {
                    include: {
                        comments: {
                            include: {
                                user: true
                            }
                        },
                        reactions: true,
                        user: true
                    }
                },
                comments: true,
                reactions: true
            }
        });
        res.json(removePassword(user));
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const user = yield prisma.user.create({
            data: data
        });
        res.json(removePassword(user));
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUser = res.locals.currentUser;
        const { id } = req.params;
        const user = yield prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (user.id !== currentUser.id && !currentUser.isAdmin) {
            throw Error;
        }
        const deletedUser = yield prisma.user.delete({
            where: {
                id: Number(id)
            }
        });
        res.json(removePassword(deletedUser));
    }
    catch (error) {
        next(error);
    }
});
exports.modifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUser = res.locals.currentUser;
        const { id } = req.params;
        const data = req.body;
        let fullData;
        if (req.file) {
            const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            fullData = Object.assign(Object.assign({}, data), { imageUrl: imageUrl });
        }
        else {
            fullData = { name: data.name, description: data.description };
        }
        const user = yield prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (user.id !== currentUser.id && !currentUser.isAdmin) {
            throw Error;
        }
        const modifiedUser = yield prisma.user.update({
            where: {
                id: Number(id)
            },
            data: fullData
        });
        res.json(removePassword(modifiedUser));
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=users.controller.js.map