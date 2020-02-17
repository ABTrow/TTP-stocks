const router = require('express').Router()
const {User, Holding, Stock, Transaction} = require('../db/models')
const axios = require('axios')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    let {data} = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${req.body.symbol}/quote?token=${
        process.env.IEX_SECRET
      }`
    )
    let [stock, _] = await Stock.findOrCreate({
      where: {symbol: data.symbol, name: data.companyName}
    })
    let user = await User.findByPk(req.user.id)
    if (!data) {
      res.status(404).send('no such stock symbol')
      return
    }
    if (data.latestPrice * req.body.shares > user.cash) {
      res.status(400).send('insufficient funds')
    } else {
      let transaction = await Transaction.create({
        userId: req.user.id,
        stockId: stock.id,
        type: 'buy',
        shares: req.body.shares,
        price: data.latestPrice
      })
      let [newHolding, _] = await Holding.findOrCreate({
        where: {
          userId: req.user.id,
          stockId: stock.id
        },
        include: [{model: Stock}]
      })
      newHolding.shares += transaction.shares
      user.cash -= transaction.shares * transaction.price

      await newHolding.save()
      await user.save()

      res.status(201).json(user)
    }
  } catch (error) {
    next(error)
  }
})
