const {Stock} = require('../db/models')
const axios = require('axios')

const getStock = async symbol => {
  try {
    let {data} = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${
        process.env.IEX_SECRET
      }`
    )
    let [stock, _] = await Stock.findOrCreate({
      where: {symbol: data.symbol, name: data.companyName}
    })

    return {...data, databaseId: stock.id}
  } catch (error) {
    throw error
  }
}

module.exports = getStock
