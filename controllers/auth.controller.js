const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(async hash => {
        const data = req.body
        const user = await prisma.user.create({
          data: {
            name: data.name,
            email: data.email,
            password: hash
          }
        })
        res.json(user)
      })
      .catch(error => res.status(500).json({ error }));
  };

exports.login = async (req, res, next) => {
  
  try {
    const { email, password } = req.body
    const user = await prisma.user.findUnique({
        where: {
          email: email
        }
    })
    if (!user) {
      return res.status(401).json({ auth: false, error: "Can't find user with this email" });
    } 
    bcrypt.compare(password, user.password)
    .then(valid => {
      if (!valid) {
        return res.status(401).json({ auth: false, error: 'Incorrect password' });
      } 
      const token = jwt.sign(
        { userId: user.id },
        process.env.RANDOM_TOKEN_SECRET,
        { expiresIn: '24h' }
      )
      res.status(200).json({
        auth: true,
        userId:user.id,
        token: token
          })
        })
  } catch (error) {
      next(error)
  }

};
