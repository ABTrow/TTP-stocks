const router = require('express').Router()
const {User, Holding, Stock, Transaction} = require('../db/models')
const axios = require('axios')
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
  } catch (error) {
    next(error)
  }
})

router.get('/:userId/holdings', async (req, res, next) => {
  try {
    let portfolio = await Holding.findAll({
      where: {userId: req.params.userId},
      include: [{model: Stock}],
      order: [['createdAt', 'DESC']]
    })
    let portfolioPrices = await Promise.all(
      portfolio.map(async holding => {
        let {data} = await axios.get(
          `https://cloud.iexapis.com/stable/stock/${
            holding.stock.symbol
          }/quote?token=${process.env.IEX_SECRET}`
        )
        return data.latestPrice
      })
    )
    res.send({portfolio, portfolioPrices})
  } catch (error) {
    next(error)
  }
})

router.get('/:userId/transactions', async (req, res, next) => {
  try {
    let transactions = await Transaction.findAll({
      where: {userId: req.params.userId},
      include: [{model: Stock}]
    })
    res.send(transactions)
  } catch (error) {
    next(error)
  }
})
