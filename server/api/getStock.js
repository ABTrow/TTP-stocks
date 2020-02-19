const {Stock} = require('../db/models')
const axios = require('axios')

const getStock = async symbol => {
  try {
    // query IEX API, displayPercent=true formats percentages for use on frontend
    let {data} = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${
        process.env.IEX_SECRET
      }&displayPercent=true`
    )
    // create a stock instance in DB to reduce API pings
    let [stock, _] = await Stock.findOrCreate({
      where: {symbol: data.symbol, name: data.companyName}
    })

    return {...data, databaseId: stock.id}
  } catch (error) {
    throw error
  }
}

module.exports = getStock
