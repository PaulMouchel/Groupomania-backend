import express, { Request, Response, NextFunction } from 'express'

const createError = require('http-errors')
import morgan from 'morgan';
import helmet from 'helmet'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.route'
import userRoutes from './routes/users.route'
import postRoutes from './routes/posts.route'
import commentRoutes from './routes/comments.route'
import reactionRoutes from './routes/reactions.route'


dotenv.config();

const app = express();

app.use(helmet())
app.use((req:Request, res:Response, next:NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});   

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', async (req:Request, res:Response, next:NextFunction) => {
  res.send({ message: 'Awesome it works 🐻' });
});

const path = require('path');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); 
app.use('/api/posts', postRoutes); 
app.use('/api/comments', commentRoutes); 
app.use('/api/reactions', reactionRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req:Request, res:Response, next:NextFunction) => {
  next(createError.NotFound());
});

app.use((err, req:Request, res:Response, next:NextFunction) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
