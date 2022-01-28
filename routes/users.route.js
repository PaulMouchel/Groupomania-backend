const express = require('express')
const router = express.Router()

const usersCtrl = require('../controllers/users.controller')

router.get('/', usersCtrl.getAllUsers)
router.post('/', usersCtrl.createUser)
router.get('/:id', usersCtrl.getOneUser)
router.delete('/:id', usersCtrl.deleteUser)
router.patch('/:id', usersCtrl.modifyUser)

module.exports = router