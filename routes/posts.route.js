const express = require('express')
const router = express.Router()

const postsCtrl = require('../controllers/posts.controller')

const auth = require('../middleware/auth.middleware')
const multer = require('../middleware/multer.middleware')

router.get('/', auth, postsCtrl.getAllPosts)
router.post('/', auth, postsCtrl.createPost)
router.get('/:id', auth, postsCtrl.getOnePost)
router.delete('/:id', auth, postsCtrl.deletePost)
router.patch('/:id', auth, postsCtrl.modifyPost)

module.exports = router