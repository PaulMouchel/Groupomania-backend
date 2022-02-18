"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const reactions_controller_1 = require("../controllers/reactions.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
router.post('/', auth_middleware_1.default, reactions_controller_1.createReaction);
router.delete('/:id', auth_middleware_1.default, reactions_controller_1.deleteReaction);
router.patch('/:id', auth_middleware_1.default, reactions_controller_1.modifyReaction);
exports.default = router;
//# sourceMappingURL=reactions.route.js.map