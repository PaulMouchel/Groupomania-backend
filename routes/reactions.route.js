const express = require('express')
const router = express.Router()

const reactionsCtrl = require('../controllers/reactions.controller')

const auth = require('../middleware/auth')

router.get('/:postId/reactions/', auth, reactionsCtrl.getAllReactions)
router.post('/:postId/reactions/', auth, reactionsCtrl.createReaction)
router.get('/:postId/reactions/:id', auth, reactionsCtrl.getOneReaction)
router.delete('/:postId/reactions/:id', auth, reactionsCtrl.deleteReaction)
router.patch('/:postId/reactions/:id', auth, reactionsCtrl.modifyReaction)

module.exports = router