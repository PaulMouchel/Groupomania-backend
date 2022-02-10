const express = require('express')
const router = express.Router()

const usersCtrl = require('../controllers/users.controller')

const auth = require('../middleware/auth.middleware')
const currentUser = require('../middleware/currentUser.middleware')
const multer = require('../middleware/multer.middleware')

// router.get('/', auth, usersCtrl.getAllUsers)
router.post('/', auth, usersCtrl.createUser)
router.get('/:id', auth, usersCtrl.getOneUser)
router.delete('/:id', auth, currentUser, usersCtrl.deleteUser)
router.patch('/:id', auth, currentUser, multer, usersCtrl.modifyUser)

module.exports = router