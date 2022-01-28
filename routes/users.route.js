const router = require('express').Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
    //   include: {category: true}
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id)
      },
    //   include: {category: true}
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
});

router.post('/', async (req, res, next) => {
  try {
    const data = req.body
    const user = await prisma.user.create({
      data: data
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedUser = await prisma.user.delete({
      where: {
        id: Number(id)
      }
    })
    res.json(deletedUser)
  } catch (error) {
    next(error)
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const data = req.body
    const user = await prisma.user.update({
      where: {
        id: Number(id)
      },
      data: data,
    //   include: {category: true}
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
});

module.exports = router;
