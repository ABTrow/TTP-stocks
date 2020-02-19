import React from 'react'
import {connect} from 'react-redux'
import {PurchaseForm} from './'
import moneyFormatter from './moneyFormatter'

const Purchase = props => {
  let {stock, userCash} = props
  if (stock.change > 0) {
    stock.color = 'green'
  } else if (stock.change < 0) {
    stock.color = 'red'
  } else {
    stock.color = 'grey'
  }
  return (
    <div id="purchase">
      <h2>Cash - {moneyFormatter.format(userCash)}</h2>
      {stock.symbol && (
        <div id="quote" className={stock.color}>
          {stock.symbol} {stock.companyName}{' '}
          {moneyFormatter.format(stock.latestPrice)}{' '}
          <small>({stock.changePercent.toFixed(2)}% today)</small>
        </div>
      )}
      <PurchaseForm />
    </div>
  )
}

const mapState = state => {
  return {
    stock: state.stock,
    userCash: state.user.cash
  }
}

export default connect(mapState, null)(Purchase)
