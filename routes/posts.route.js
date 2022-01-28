const router = require('express').Router();

const postsCtrl = require('../controllers/posts.controller');

router.get('/', postsCtrl.getAllPosts);
router.post('/', postsCtrl.createPost);
router.get('/:id', postsCtrl.getOnePost);
router.delete('/:id', postsCtrl.deletePost);
router.patch('/:id', postsCtrl.modifyPost);

module.exports = router;
