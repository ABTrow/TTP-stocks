const router = require('express').Router()
const {Holding, Stock, Transaction} = require('../db/models')
const getStock = require('./getStock')
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
        let stock = await getStock(holding.stock.symbol)
        return stock
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
      include: [{model: Stock}],
      order: [['createdAt', 'DESC']]
    })
    res.send(transactions)
  } catch (error) {
    next(error)
  }
})
