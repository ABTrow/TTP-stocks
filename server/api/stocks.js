const router = require('express').Router()
const {User, Holding, Stock, Transaction} = require('../db/models')
const axios = require('axios')
module.exports = router

router.get('/:symbol', async (req, res, next) => {
  try {
    let {data} = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${
        req.params.symbol
      }/quote?token=${process.env.IEX_SECRET}`
    )
    await Stock.findOrCreate({
      where: {symbol: data.symbol, name: data.companyName}
    })
    res.send(data)
  } catch (error) {
    next(error)
  }
})
