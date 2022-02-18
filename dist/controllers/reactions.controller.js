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
exports.modifyReaction = exports.deleteReaction = exports.createReaction = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createReaction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        console.log(data);
        const reaction = yield prisma.reaction.create({
            data: data
        });
        res.json(reaction);
    }
    catch (error) {
        next(error);
    }
});
exports.createReaction = createReaction;
const deleteReaction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const reaction = yield prisma.reaction.delete({
            where: {
                id: Number(id)
            }
        });
        res.json(reaction);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteReaction = deleteReaction;
const modifyReaction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const reaction = yield prisma.reaction.update({
            where: {
                id: Number(id)
            },
            data: data,
        });
        res.json(reaction);
    }
    catch (error) {
        next(error);
    }
});
exports.modifyReaction = modifyReaction;
//# sourceMappingURL=reactions.controller.js.map