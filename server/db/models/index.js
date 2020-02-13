const User = require('./user')
const Stock = require('./stock')
const Holding = require('./holding')
const Transaction = require('./transaction')

User.belongsToMany(Stock, {through: 'holding'})
Stock.belongsToMany(User, {through: 'holding'})

User.belongsToMany(Stock, {through: 'transaction'})
Stock.belongsToMany(User, {through: 'transaction'})

module.exports = {
  User,
  Stock,
  Holding,
  Transaction
}
