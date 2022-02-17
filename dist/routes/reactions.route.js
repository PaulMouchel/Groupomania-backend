"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const reactionsCtrl = require('../controllers/reactions.controller');
const auth = require('../middleware/auth.middleware');
router.post('/', auth, reactionsCtrl.createReaction);
router.delete('/:id', auth, reactionsCtrl.deleteReaction);
router.patch('/:id', auth, reactionsCtrl.modifyReaction);
module.exports = router;
//# sourceMappingURL=reactions.route.js.map