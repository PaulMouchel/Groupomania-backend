const express = require('express')
const router = express.Router()

const reactionsCtrl = require('../controllers/reactions.controller')

router.get('/', reactionsCtrl.getAllReactions)
router.post('/', reactionsCtrl.createReaction)
router.get('/:id', reactionsCtrl.getOneReaction)
router.delete('/:id', reactionsCtrl.deleteReaction)
router.patch('/:id', reactionsCtrl.modifyReaction)

module.exports = router