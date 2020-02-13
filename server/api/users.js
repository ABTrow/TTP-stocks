const router = require('express').Router()
const {User, Holding, Stock} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err0r) {
    next(err0r)
  }
})

router.get('/:userId/holdings', async (req, res, next) => {
  try {
    let portfolio = await Holding.findAll({
      where: {
        userId: req.params.userId
      },
      include: [{model: Stock}]
    })
    res.send(portfolio)
  } catch (error) {
    next(error)
  }
})
