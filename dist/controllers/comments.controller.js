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
exports.modifyComment = exports.deleteComment = exports.createComment = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const comment = yield prisma.comment.create({
            data: data,
            include: { user: true }
        });
        res.json(comment);
    }
    catch (error) {
        next(error);
    }
});
exports.createComment = createComment;
const deleteComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUser = res.locals.currentUser;
        const { id } = req.params;
        const comment = yield prisma.comment.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (comment.userId !== currentUser.id && !currentUser.isAdmin) {
            throw Error;
        }
        const deletedComment = yield prisma.comment.delete({
            where: {
                id: Number(id)
            }
        });
        res.json(deletedComment);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteComment = deleteComment;
const modifyComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUser = res.locals.currentUser;
        const { id } = req.params;
        const data = req.body;
        const comment = yield prisma.comment.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (comment.userId !== currentUser.id && !currentUser.isAdmin) {
            throw Error;
        }
        const newComment = yield prisma.comment.update({
            where: {
                id: Number(id)
            },
            data: data,
            include: {
                user: true
            }
        });
        res.json(newComment);
    }
    catch (error) {
        next(error);
    }
});
exports.modifyComment = modifyComment;
//# sourceMappingURL=comments.controller.js.map