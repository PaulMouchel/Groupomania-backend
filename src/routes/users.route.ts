import express from 'express'
const router = express.Router()

import { createUser, getOneUser, deleteUser, modifyUser } from '../controllers/users.controller'
import auth from '../middleware/auth.middleware'
import currentUser from '../middleware/currentUser.middleware'
const multer = require('../middleware/multer.middleware')

router.post('/', auth, createUser)
router.get('/:id', auth, getOneUser)
router.delete('/:id', auth, currentUser, deleteUser)
router.patch('/:id', auth, currentUser, multer, modifyUser)

export default router