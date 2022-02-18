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
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const currentUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.currentUserId;
        const currentUser = yield prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true, isAdmin: true
            }
        });
        if (!currentUser) {
            throw 'Invalid user Id';
        }
        else {
            res.locals.currentUser = currentUser;
            next();
        }
    }
    catch (error) {
        res.status(401).json({
            auth: false,
            error: error
        });
    }
});
exports.default = currentUser;
//# sourceMappingURL=currentUser.middleware.js.map