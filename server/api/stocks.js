const router = require('express').Router()
const getStock = require('./getStock')
module.exports = router

router.get('/:symbol', async (req, res, next) => {
  try {
    let stock = await getStock(req.params.symbol)
    res.status(200).send(stock)
  } catch (error) {
    if (error.response.status === 404) {
      res.status(404).send('No stock associated with that symbol.')
      return
    }
    next(error)
  }
})
