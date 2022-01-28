const express = require('express')
const router = express.Router()

const commentsCtrl = require('../controllers/comments.controller')

router.get('/:postId/comments', commentsCtrl.getAllComments)
router.post('/:postId/comments', commentsCtrl.createComment)
router.get('/:postId/comments/:id', commentsCtrl.getOneComment)
router.delete('/:postId/comments/:id', commentsCtrl.deleteComment)
router.patch('/:postId/comments/:id', commentsCtrl.modifyComment)

module.exports = router


