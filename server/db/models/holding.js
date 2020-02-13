const Sequelize = require('sequelize')
const db = require('../db')

const Holding = db.define('holding', {
  shares: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  }
})

module.exports = Holding
