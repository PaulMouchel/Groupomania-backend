import express from 'express'
const router = express.Router()

import { getAllPosts, createPost, deletePost, modifyPost } from '../controllers/posts.controller'
import auth from '../middleware/auth.middleware'
import currentUser from '../middleware/currentUser.middleware'
import multerS3 from '../middleware/multerS3.middleware'

router.get('/', auth, getAllPosts)
router.post('/', auth, multerS3, createPost)
router.delete('/:id', auth, currentUser, deletePost)
router.patch('/:id', auth, currentUser, multerS3, modifyPost)

export default router