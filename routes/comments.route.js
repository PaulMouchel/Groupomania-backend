const express = require('express')
const router = express.Router()

const commentsCtrl = require('../controllers/comments.controller')

const auth = require('../middleware/auth.middleware')
const currentUser = require('../middleware/currentUser.middleware')

// router.get('/', auth, commentsCtrl.getAllComments)
router.post('/', auth, commentsCtrl.createComment)
// router.get('/:id', auth, commentsCtrl.getOneComment)
router.delete('/:id', auth, currentUser, commentsCtrl.deleteComment)
router.patch('/:id', auth, currentUser, commentsCtrl.modifyComment)

module.exports = router


