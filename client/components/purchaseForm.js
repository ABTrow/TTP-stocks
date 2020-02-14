import React from 'react'
import {connect} from 'react-redux'
import {buyStock} from '../store/portfolio'

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

  handleSubmit = () => {
    event.preventDefault()
    this.props.buyStock(this.state.symbol, this.state.shares)
    this.setState({symbol: '', shares: 0})
  }

  render() {
    return (
      <div>
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
        <button type="submit" onClick={this.handleSubmit}>
          Purchase Shares
        </button>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    buyStock: (symbol, shares) => dispatch(buyStock(symbol, shares))
  }
}

export default connect(null, mapDispatch)(PurchaseForm)
