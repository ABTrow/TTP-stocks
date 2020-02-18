import React from 'react'
import {connect} from 'react-redux'
import {PurchaseForm} from './'

const Purchase = props => {
  let {stock, userCash} = props
  return (
    <div id="purchase">
      <h2>Cash - ${userCash}</h2>
      {stock && (
        <div>
          {stock.symbol} {stock.companyName} {stock.latestPrice}
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
