"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createError = require('http-errors');
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const posts_route_1 = __importDefault(require("./routes/posts.route"));
const comments_route_1 = __importDefault(require("./routes/comments.route"));
const reactions_route_1 = __importDefault(require("./routes/reactions.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)('dev'));
const path = require('path');
const test = () => {
    console.log("test");
};
app.use('/api/auth', auth_route_1.default);
app.use('/api/users', users_route_1.default);
app.use('/api/posts', posts_route_1.default);
app.use('/api/comments', comments_route_1.default);
app.use('/api/reactions', reactions_route_1.default);
app.use('/images', test);
// app.use('../images', express.static(path.join(__dirname, '../images')));
app.use((req, res, next) => {
    next(createError.NotFound());
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message,
    });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
//# sourceMappingURL=app.js.map