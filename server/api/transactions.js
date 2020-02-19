const router = require('express').Router()
const {User, Holding, Stock, Transaction} = require('../db/models')
const getStock = require('./getStock')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    let stock = await getStock(req.body.symbol)
    let user = await User.findByPk(req.user.id)

    if (stock.latestPrice * req.body.shares > user.cash) {
      res.status(400).send('Insufficient funds.')
      return
    }

    let transaction = await Transaction.create({
      userId: req.user.id,
      stockId: stock.databaseId,
      type: 'buy',
      shares: req.body.shares,
      price: stock.latestPrice
    })
    let [newHolding, _] = await Holding.findOrCreate({
      where: {
        userId: req.user.id,
        stockId: stock.databaseId
      }
    })

    newHolding.shares += transaction.shares
    user.cash -= transaction.shares * transaction.price

    await newHolding.save()
    await user.save()

    res.status(201).json(user)
  } catch (error) {
    if (error.response.status === 404) {
      res.status(404).send('No stock associated with that symbol.')
      return
    }
    next(error)
  }
})
