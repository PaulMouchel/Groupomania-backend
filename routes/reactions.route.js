const express = require('express')
const router = express.Router()

const reactionsCtrl = require('../controllers/reactions.controller')

const auth = require('../middleware/auth.middleware')

router.post('/', auth, reactionsCtrl.createReaction)
router.delete('/:id', auth, reactionsCtrl.deleteReaction)
router.patch('/:id', auth, reactionsCtrl.modifyReaction)

module.exports = router