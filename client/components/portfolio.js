import React from 'react'
import {connect} from 'react-redux'
import {getHoldings} from '../store/portfolio'

class Portfolio extends React.Component {
  componentDidMount() {
    this.props.getHoldings(this.props.userId)
  }

  render() {
    return (
      <div>
        {this.props.portfolio.map(holding => {
          return (
            <div key={holding.id}>
              <span>{holding.stock.name}</span>
              <span>{holding.shares}</span>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    portfolio: state.portfolio,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getHoldings: userId => dispatch(getHoldings(userId))
  }
}

export default connect(mapState, mapDispatch)(Portfolio)
