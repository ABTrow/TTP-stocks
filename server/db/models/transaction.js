const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('transaction', {
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: ['purchase', 'sale']
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
      return this.getDataValue('cash') / 100
    },
    set(unformattedValue) {
      this.setDataValue('cash', unformattedValue * 100)
    }
  }
})

module.exports = Transaction
