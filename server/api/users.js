const router = require('express').Router()
const {Holding, Stock, Transaction} = require('../db/models')
const getStock = require('./getStock')
module.exports = router

/*
  Authentication middleware.
  Verifies if there is a user logged in and if that the session 'user.id' matches
  the 'userId' URL parameter in the API route the user is attempting to access
*/
const authUser = (req, res, next) => {
  if (!req.user || req.user.id !== Number(req.params.userId)) {
    res.sendStatus(401)
  } else {
    next()
  }
}

// get info for portfolio display
router.get('/:userId/holdings', authUser, async (req, res, next) => {
  try {
    // find user's holdings in database
    let portfolio = await Holding.findAll({
      where: {userId: req.params.userId},
      include: [{model: Stock}],
      order: [['createdAt', 'DESC']]
    })
    // get current stock price info from IEX
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

// get info for transaction history
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
