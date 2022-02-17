"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const commentsCtrl = require('../controllers/comments.controller');
const auth = require('../middleware/auth.middleware');
const currentUser = require('../middleware/currentUser.middleware');
// router.get('/', auth, commentsCtrl.getAllComments)
router.post('/', auth, commentsCtrl.createComment);
// router.get('/:id', auth, commentsCtrl.getOneComment)
router.delete('/:id', auth, currentUser, commentsCtrl.deleteComment);
router.patch('/:id', auth, currentUser, commentsCtrl.modifyComment);
module.exports = router;
//# sourceMappingURL=comments.route.js.map