const express = require('express')
const router = express.Router()

const postsCtrl = require('../controllers/posts.controller')

const auth = require('../middleware/auth.middleware')
const currentUser = require('../middleware/currentUser.middleware')
const multer = require('../middleware/multer.middleware')

router.get('/', auth, postsCtrl.getAllPosts)
router.post('/', auth, multer, postsCtrl.createPost)
router.get('/:id', auth, postsCtrl.getOnePost)
router.delete('/:id', auth, currentUser, postsCtrl.deletePost)
router.patch('/:id', auth, currentUser, multer, postsCtrl.modifyPost)

module.exports = router