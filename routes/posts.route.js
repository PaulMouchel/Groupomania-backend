const express = require('express')
const router = express.Router()

const postsCtrl = require('../controllers/posts.controller')

const auth = require('../middleware/auth.middleware')
const multer = require('../middleware/multer.middleware')

router.get('/', auth, postsCtrl.getAllPosts)
router.post('/', auth, multer, postsCtrl.createPost)
router.get('/:id', auth, postsCtrl.getOnePost)
router.delete('/:id', auth, postsCtrl.deletePost)
router.patch('/:id', auth, multer, postsCtrl.modifyPost)

module.exports = router