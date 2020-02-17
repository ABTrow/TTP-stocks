const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('transaction', {
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['buy', 'sell']]
    }
  },
  shares: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    },
    get() {
      return this.getDataValue('price') / 100
    },
    set(unformattedValue) {
      this.setDataValue('price', Math.round(unformattedValue * 100))
    }
  }
})

module.exports = Transaction
