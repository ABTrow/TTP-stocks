const router = require('express').Router()
const {User, Holding, Stock, Transaction} = require('../db/models')
const axios = require('axios')
module.exports = router

const authUser = (req, res, next) => {
  if (!req.user || req.user.id !== Number(req.params.userId)) {
    res.sendStatus(401)
  } else {
    next()
  }
}

router.get('/:userId/holdings', authUser, async (req, res, next) => {
  try {
    let portfolio = await Holding.findAll({
      where: {userId: req.params.userId},
      include: [{model: Stock}],
      order: [['createdAt', 'DESC']]
    })
    let portfolioInfo = await Promise.all(
      portfolio.map(async holding => {
        let {data} = await axios.get(
          `https://cloud.iexapis.com/stable/stock/${
            holding.stock.symbol
          }/quote?token=${process.env.IEX_SECRET}`
        )
        return data
      })
    )
    res.send({portfolio, portfolioInfo})
  } catch (error) {
    next(error)
  }
})

router.get('/:userId/transactions', authUser, async (req, res, next) => {
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
