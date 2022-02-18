"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const posts_controller_1 = require("../controllers/posts.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const currentUser_middleware_1 = __importDefault(require("../middleware/currentUser.middleware"));
const multer_middleware_1 = __importDefault(require("../middleware/multer.middleware"));
router.get('/', auth_middleware_1.default, posts_controller_1.getAllPosts);
router.post('/', auth_middleware_1.default, multer_middleware_1.default, posts_controller_1.createPost);
router.delete('/:id', auth_middleware_1.default, currentUser_middleware_1.default, posts_controller_1.deletePost);
router.patch('/:id', auth_middleware_1.default, currentUser_middleware_1.default, multer_middleware_1.default, posts_controller_1.modifyPost);
exports.default = router;
//# sourceMappingURL=posts.route.js.map