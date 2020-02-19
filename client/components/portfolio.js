import React from 'react'
import {connect} from 'react-redux'
import {getHoldings} from '../store/portfolio'
import moneyFormatter from './moneyFormatter'

class Portfolio extends React.Component {
  componentDidMount() {
    this.props.getHoldings(this.props.userId)
  }

  render() {
    if (!this.props.portfolio.holdings) {
      // Render loading div if still waiting for API data
      return <div className="nothing-here">Loading...</div>
    } else if (!this.props.portfolio.holdings.length) {
      return (
        // A helpful message if the portfolio is empty
        <div className="nothing-here">
          You haven't purchased any stocks yet...
        </div>
      )
    } else {
      return (
        <div id="portfolio">
          <table>
            <tbody>
              {/* Determine proper display color based on daily price change */}
              {this.props.portfolio.holdings.map(holding => {
                if (holding.stockInfo.change > 0) {
                  holding.color = 'green'
                } else if (holding.stockInfo.change < 0) {
                  holding.color = 'red'
                } else {
                  holding.color = 'grey'
                }
                // render table row with holding info
                return (
                  <tr key={holding.id} className={holding.color}>
                    <td>
                      {holding.stock.symbol}
                      <small> ({holding.stock.name})</small>
                    </td>
                    <td className="right">{holding.shares} Shares @</td>
                    <td>
                      {moneyFormatter.format(holding.stockInfo.latestPrice)}
                      <small>
                        {' '}
                        ({holding.stockInfo.changePercent.toFixed(2)}% today)
                      </small>
                    </td>
                    <td>
                      Total:
                      {moneyFormatter.format(
                        holding.stockInfo.latestPrice * holding.shares
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <small>
            <a href="https://iexcloud.io">Pricing data provided by IEX Cloud</a>
          </small>
        </div>
      )
    }
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
