import React from 'react'
import {connect} from 'react-redux'
import {buyStock} from '../store/portfolio'
import {getQuote} from '../store/stock'

class PurchaseForm extends React.Component {
  constructor() {
    super()
    this.state = {
      symbol: '',
      shares: 0
    }
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handlePurchase = () => {
    event.preventDefault()
    this.props.buyStock(this.state.symbol, this.state.shares)
    this.setState({symbol: '', shares: 0})
  }

  handleQuote = () => {
    event.preventDefault()
    this.props.getQuote(this.state.symbol)
  }

  render() {
    return (
      <div id="purchase-form">
        <input
          type="text"
          name="symbol"
          placeholder="Enter Ticker Symbol"
          value={this.state.symbol}
          onChange={event => this.handleChange(event)}
        />
        <input
          type="number"
          name="shares"
          id="shares"
          placeholder="shares"
          value={this.state.shares}
          onChange={event => this.handleChange(event)}
        />
        <button type="submit" onClick={this.handleQuote}>
          Get Quote
        </button>
        <button type="submit" onClick={this.handlePurchase}>
          Purchase Shares
        </button>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    buyStock: (symbol, shares) => dispatch(buyStock(symbol, shares)),
    getQuote: quote => dispatch(getQuote(quote))
  }
}

export default connect(null, mapDispatch)(PurchaseForm)
