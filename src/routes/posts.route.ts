import express from 'express'
const router = express.Router()

import { getAllPosts, createPost, deletePost, modifyPost } from '../controllers/posts.controller'
import auth from '../middleware/auth.middleware'
import currentUser from '../middleware/currentUser.middleware'
import multer from '../middleware/multer.middleware'

router.get('/', auth, getAllPosts)
router.post('/', auth, multer, createPost)
router.delete('/:id', auth, currentUser, deletePost)
router.patch('/:id', auth, currentUser, multer, modifyPost)

export default router