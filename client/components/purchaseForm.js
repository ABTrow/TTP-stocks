import React from 'react'
import {connect} from 'react-redux'
import {buyStock} from '../store/portfolio'
import {getQuote} from '../store/stock'
import {buyError} from '../store/errors'

class PurchaseForm extends React.Component {
  constructor() {
    super()
    this.state = {
      symbol: '',
      shares: 'shares'
    }
  }

  handleChange = event => {
    // handleChange for controlled form
    this.setState({[event.target.name]: event.target.value.toUpperCase()})
  }

  handlePurchase = () => {
    event.preventDefault()
    if (this.state.shares % 1 !== 0) {
      this.props.buyError('Cannot buy partial shares.')
      return
    }
    if (this.state.shares <= 0) {
      this.props.buyError('Must buy a positive number of shares.')
      return
    }
    this.props.buyStock(this.state.symbol, this.state.shares)
    this.setState({symbol: '', shares: 0})
  }

  handleQuote = () => {
    event.preventDefault()
    this.props.getQuote(this.state.symbol)
  }

  render() {
    let {error} = this.props

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
        <div className="button-box">
          <button type="submit" onClick={this.handleQuote}>
            Get Quote
          </button>
          <button type="submit" onClick={this.handlePurchase}>
            Purchase Shares
          </button>
        </div>
        {/* Conditionally render errors if there is an issue */}
        {error &&
          error.response && (
            <div className="error"> {error.response.data} </div>
          )}
      </div>
    )
  }
}

const mapState = state => ({
  error: state.errors.buyError
})

const mapDispatch = dispatch => {
  return {
    buyStock: (symbol, shares) => dispatch(buyStock(symbol, shares)),
    getQuote: quote => dispatch(getQuote(quote)),
    buyError: error => dispatch(buyError({response: {data: error}}))
  }
}

export default connect(mapState, mapDispatch)(PurchaseForm)
