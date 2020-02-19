const router = require('express').Router()
module.exports = router

// routers to handle different API branches
router.use('/users', require('./users'))
router.use('/stocks', require('./stocks'))
router.use('/transactions', require('./transactions'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
