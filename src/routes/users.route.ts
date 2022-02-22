import express from 'express'
const router = express.Router()

import { createUser, getOneUser, deleteUser, modifyUser } from '../controllers/users.controller'
import auth from '../middleware/auth.middleware'
import currentUser from '../middleware/currentUser.middleware'
import multerS3 from '../middleware/multerS3.middleware'

router.post('/', auth, createUser)
router.get('/:id', auth, getOneUser)
router.delete('/:id', auth, currentUser, deleteUser)
router.patch('/:id', auth, currentUser, multerS3, modifyUser)

export default router