const express = require('express')
const router = express.Router()

const commentsCtrl = require('../controllers/comments.controller')

router.get('/', commentsCtrl.getAllComments)
router.post('/', commentsCtrl.createComment)
router.get('/:id', commentsCtrl.getOneComment)
router.delete('/:id', commentsCtrl.deleteComment)
router.patch('/:id', commentsCtrl.modifyComment)

module.exports = router


