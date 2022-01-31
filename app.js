const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});   

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/users.route');
const postRoutes = require('./routes/posts.route');
const commentRoutes = require('./routes/comments.route');
const reactionRoutes = require('./routes/reactions.route');

app.use('/api', require('./routes/api.route'));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); 
app.use('/api/posts', postRoutes); 
app.use('/api/posts/:postId/comments', commentRoutes); 
app.use('/api/reactions', reactionRoutes); 

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
