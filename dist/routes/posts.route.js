"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const postsCtrl = require('../controllers/posts.controller');
const auth = require('../middleware/auth.middleware');
const currentUser = require('../middleware/currentUser.middleware');
const multer = require('../middleware/multer.middleware');
router.get('/', auth, postsCtrl.getAllPosts);
router.post('/', auth, multer, postsCtrl.createPost);
// router.get('/:id', auth, postsCtrl.getOnePost)
router.delete('/:id', auth, currentUser, postsCtrl.deletePost);
router.patch('/:id', auth, currentUser, multer, postsCtrl.modifyPost);
module.exports = router;
//# sourceMappingURL=posts.route.js.map