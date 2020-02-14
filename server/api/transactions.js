const router = require('express').Router()
const {User, Holding, Stock, Transaction} = require('../db/models')
const axios = require('axios')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    let {data} = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${
        req.params.symbol
      }/quote?token=${process.env.IEX_SECRET}`
    )
    if (data.latestPrice * req.body.shares > req.user.cash) {
      res.send({error: 'not enough cash'})
    } else {
      res.send({success: 'resounding success'})
    }
  } catch (error) {
    next(error)
  }
})
