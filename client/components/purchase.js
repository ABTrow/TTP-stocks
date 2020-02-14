import React from 'react'
import {connect} from 'react-redux'
import {QuoteForm, PurchaseForm} from './'

const Purchase = props => {
  let {stock} = props
  return (
    <div>
      {stock && (
        <div>
          {stock.symbol} {stock.companyName} {stock.latestPrice}
        </div>
      )}
      <QuoteForm />
      <PurchaseForm />
    </div>
  )
}

const mapState = state => {
  return {
    stock: state.stock
  }
}

export default connect(mapState, null)(Purchase)
