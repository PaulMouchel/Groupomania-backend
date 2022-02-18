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
exports.modifyPost = exports.deletePost = exports.createPost = exports.getAllPosts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield prisma.post.findMany({
            include: { user: true, comments: { include: { user: true } }, reactions: true }
        });
        res.json(posts);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllPosts = getAllPosts;
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        data.userId = Number(data.userId);
        let fullData;
        if (req.file) {
            const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            fullData = Object.assign(Object.assign({}, data), { imageUrl: imageUrl });
        }
        else {
            fullData = data;
        }
        const post = yield prisma.post.create({
            data: fullData,
            include: { user: true, comments: true, reactions: true }
        });
        res.json(post);
    }
    catch (error) {
        next(error);
    }
});
exports.createPost = createPost;
const deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUser = res.locals.currentUser;
        const { id } = req.params;
        const post = yield prisma.post.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (post.userId !== currentUser.id && !currentUser.isAdmin) {
            throw Error;
        }
        const deletedPost = yield prisma.post.delete({
            where: {
                id: Number(id)
            }
        });
        res.json(deletedPost);
    }
    catch (error) {
        next(error);
    }
});
exports.deletePost = deletePost;
const modifyPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
            fullData = data;
        }
        const oldPost = yield prisma.post.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (oldPost.userId === currentUser.id || currentUser.isAdmin) {
            const post = yield prisma.post.update({
                where: {
                    id: Number(id)
                },
                data: fullData,
                include: {
                    user: true,
                    reactions: true,
                    comments: {
                        include: {
                            user: true
                        }
                    }
                }
            });
            res.json(post);
        }
        else {
            throw new Error;
        }
    }
    catch (error) {
        next(error);
    }
});
exports.modifyPost = modifyPost;
//# sourceMappingURL=posts.controller.js.map