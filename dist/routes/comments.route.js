"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const comments_controller_1 = require("../controllers/comments.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const currentUser_middleware_1 = __importDefault(require("../middleware/currentUser.middleware"));
router.post('/', auth_middleware_1.default, comments_controller_1.createComment);
router.delete('/:id', auth_middleware_1.default, currentUser_middleware_1.default, comments_controller_1.deleteComment);
router.patch('/:id', auth_middleware_1.default, currentUser_middleware_1.default, comments_controller_1.modifyComment);
exports.default = router;
//# sourceMappingURL=comments.route.js.map