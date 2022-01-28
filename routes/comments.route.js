const router = require('express').Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req, res, next) => {
  try {
    const comments = await prisma.comments.findMany({
      include: {category: true}
    })
    res.json(comments)
  } catch (error) {
    next(error)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const comment = await prisma.comment.findUnique({
      where: {
        id: Number(id)
      },
      include: {category: true}
    })
    res.json(comment)
  } catch (error) {
    next(error)
  }
});

router.post('/', async (req, res, next) => {
  try {
    const data = req.body
    const product = await prisma.product.create({
      data: data
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedProduct = await prisma.product.delete({
      where: {
        id: Number(id)
      }
    })
    res.json(deletedProduct)
  } catch (error) {
    next(error)
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const data = req.body
    const product = await prisma.product.update({
      where: {
        id: Number(id)
      },
      data: data,
      include: {category: true}
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
});

module.exports = router;
