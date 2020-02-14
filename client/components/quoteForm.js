import React from 'react'
import {connect} from 'react-redux'
import {getQuote} from '../store/stock'

class QuoteForm extends React.Component {
  constructor() {
    super()
    this.state = {
      symbol: ''
    }
  }

  handleChange = event => {
    this.setState({symbol: event.target.value})
  }

  handleSubmit = () => {
    event.preventDefault()
    this.props.getQuote(this.state.symbol)
    this.setState({symbol: ''})
  }

  render() {
    return (
      <div>
        <input
          type="text"
          name="symbol"
          id="symbol"
          placeholder="Enter Ticker Symbol"
          value={this.state.symbol}
          onChange={event => this.handleChange(event)}
        />
        <button type="submit" onClick={this.handleSubmit}>
          Get Quote
        </button>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    getQuote: quote => dispatch(getQuote(quote))
  }
}

export default connect(null, mapDispatch)(QuoteForm)
