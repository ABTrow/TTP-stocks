const router = require('express').Router()
const {User, Holding, Stock, Transaction} = require('../db/models')
const getStock = require('./getStock')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    // get stock and user info
    let stock = await getStock(req.body.symbol)
    let user = await User.findByPk(req.user.id)

    // confirm if user has enough cash to make transaction
    if (stock.latestPrice * req.body.shares > user.cash) {
      res.status(400).send('Insufficient funds.')
      return
    }

    // create a transaction object
    let transaction = await Transaction.create({
      userId: req.user.id,
      stockId: stock.databaseId,
      type: 'buy',
      shares: req.body.shares,
      price: stock.latestPrice
    })

    // see if user has a holding of that stock. if not, create one
    let [newHolding, _] = await Holding.findOrCreate({
      where: {
        userId: req.user.id,
        stockId: stock.databaseId
      }
    })

    // increment holding shares (new holding defaults to zero), decrement cash
    newHolding.shares += transaction.shares
    user.cash -= transaction.shares * transaction.price

    // update instances in database
    await newHolding.save()
    await user.save()

    res.status(201).json(user)
  } catch (error) {
    // if no such stock send a 404
    if (error.response.status === 404) {
      res.status(404).send('No stock associated with that symbol.')
      return
    }
    next(error)
  }
})
