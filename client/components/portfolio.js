import React from 'react'
import {connect} from 'react-redux'
import {getHoldings} from '../store/portfolio'
import moneyFormatter from './moneyFormatter'

class Portfolio extends React.Component {
  componentDidMount() {
    this.props.getHoldings(this.props.userId)
  }

  render() {
    return (
      <div id="portfolio">
        <table>
          <tbody>
            {this.props.portfolio.holdings.map(holding => {
              if (holding.stockInfo.change > 0) {
                holding.color = 'green'
              } else if (holding.stockInfo.change < 0) {
                holding.color = 'red'
              } else {
                holding.color = 'grey'
              }
              return (
                <tr key={holding.id} className={holding.color}>
                  <td>
                    {holding.stock.symbol}
                    <small> ({holding.stock.name})</small>
                  </td>
                  <td className="right">{holding.shares} Shares @</td>
                  <td>
                    {moneyFormatter.format(holding.stockInfo.latestPrice)}
                    <small> ({holding.stockInfo.changePercent}% today)</small>
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
          <a href="https://iexcloud.io">Data provided by IEX Cloud</a>
        </small>
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
