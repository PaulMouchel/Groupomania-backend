const express = require('express')
const router = express.Router()

const reactionsCtrl = require('../controllers/reactions.controller')

router.get('/:postId/reactions', reactionsCtrl.getAllReactions)
router.post('/:postId/reactions', reactionsCtrl.createReaction)
router.get('/:postId/reactions/:id', reactionsCtrl.getOneReaction)
router.delete('/:postId/reactions/:id', reactionsCtrl.deleteReaction)
router.patch('/:postId/reactions/:id', reactionsCtrl.modifyReaction)

module.exports = router