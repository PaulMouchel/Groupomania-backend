import express from 'express'
const router = express.Router()

import { createComment, deleteComment, modifyComment } from '../controllers/comments.controller'
import auth from '../middleware/auth.middleware'
import currentUser from '../middleware/currentUser.middleware'

router.post('/', auth, createComment)
router.delete('/:id', auth, currentUser, deleteComment)
router.patch('/:id', auth, currentUser, modifyComment)

module.exports = router


