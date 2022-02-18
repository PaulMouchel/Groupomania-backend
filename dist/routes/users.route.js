"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const users_controller_1 = require("../controllers/users.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const currentUser_middleware_1 = __importDefault(require("../middleware/currentUser.middleware"));
const multer_middleware_1 = __importDefault(require("../middleware/multer.middleware"));
router.post('/', auth_middleware_1.default, users_controller_1.createUser);
router.get('/:id', auth_middleware_1.default, users_controller_1.getOneUser);
router.delete('/:id', auth_middleware_1.default, currentUser_middleware_1.default, users_controller_1.deleteUser);
router.patch('/:id', auth_middleware_1.default, currentUser_middleware_1.default, multer_middleware_1.default, users_controller_1.modifyUser);
exports.default = router;
//# sourceMappingURL=users.route.js.map