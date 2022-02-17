import express from 'express'
const router = express.Router()

import { createReaction, deleteReaction, modifyReaction } from '../controllers/reactions.controller'
import auth from '../middleware/auth.middleware'

router.post('/', auth, createReaction)
router.delete('/:id', auth, deleteReaction)
router.patch('/:id', auth, modifyReaction)

export default router