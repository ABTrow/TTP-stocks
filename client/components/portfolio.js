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
        <table>
          <tbody>
            {this.props.portfolio.holdings.map(holding => {
              return (
                <tr key={holding.id}>
                  <td>
                    {holding.stock.symbol}
                    <small> ({holding.stock.name})</small>
                  </td>
                  <td className="right">{holding.shares} Shares @</td>
                  <td className="right">${holding.latestPrice.toFixed(2)}</td>
                  <td>
                    Total: ${(holding.latestPrice * holding.shares).toFixed(2)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
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
