const Sequelize = require('sequelize')
const db = require('../db')

const Holding = db.define('holding', {
  shares: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
})

module.exports = Holding
