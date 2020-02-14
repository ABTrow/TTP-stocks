const User = require('./user')
const Stock = require('./stock')
const Holding = require('./holding')
const Transaction = require('./transaction')

User.hasMany(Holding)
Holding.belongsTo(User)

Stock.hasMany(Holding)
Holding.belongsTo(Stock)

User.hasMany(Transaction)
Transaction.belongsTo(User)

Stock.hasMany(Transaction)
Transaction.belongsTo(Stock)

module.exports = {
  User,
  Stock,
  Holding,
  Transaction
}
