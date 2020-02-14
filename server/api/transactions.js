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
    if (!data) {
      res.status(404).send('no such stock symbol')
      return
    }
    if (data.latestPrice * req.body.shares > req.user.cash) {
      res.status(400).send('insufficient funds')
    } else {
      await Transaction.create({
        userId: req.user.id,
        stockId: stock.id,
        type: 'purchase',
        shares: req.body.shares,
        price: data.latestPrice
      })
      let newHolding = await Holding.create(
        {
          userId: req.user.id,
          stockId: stock.id,
          shares: req.body.shares
        },
        {include: [{model: Stock}]}
      )
      let stockInfo = await newHolding.getStock()
      res.status(201).json({holding: newHolding, stock: stockInfo})
    }
  } catch (error) {
    next(error)
  }
})
