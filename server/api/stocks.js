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
    res.status(200).send(data)
  } catch (error) {
    if (error.response.status === 404) {
      res.status(404).send('No stock associated with that symbol')
      return
    }
    next(error)
  }
})
