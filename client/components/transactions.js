import React from 'react'
import {connect} from 'react-redux'
import {getTransactions} from '../store/transactions'
import moneyFormatter from './moneyFormatter'

class Transactions extends React.Component {
  componentDidMount() {
    this.props.getTransactions(this.props.userId)
  }

  render() {
    let {transactions} = this.props

    if (!transactions) {
      // Fallback if still loading transactions
      return (
        <div>
          <h1 className="page-header">Transactions:</h1>
          <div className="nothing-here">Loading...</div>
        </div>
      )
    } else if (!transactions.length) {
      // a helpful message if no transactions have been made
      return (
        <div>
          <h1 className="page-header">Transactions:</h1>
          <div className="nothing-here">
            You haven't made any transactions yet...
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <h1 className="page-header">Transactions:</h1>
          <table id="transaction-table">
            <tbody>
              {/* render a table row for each transaction */}
              {transactions.map(transaction => {
                let date = new Date(transaction.createdAt)
                return (
                  <tr key={transaction.id} className="transaction">
                    <td>{date.toLocaleDateString()}</td>
                    <td>{date.toLocaleTimeString()}</td>
                    <td>{transaction.type.toUpperCase()}</td>
                    <td>
                      ({transaction.stock.symbol} - {transaction.stock.name})
                    </td>
                    <td className="right">{transaction.shares} Shares @</td>
                    <td className="right">
                      {moneyFormatter.format(transaction.price)}
                    </td>
                    <td>
                      Total:{' '}
                      {moneyFormatter.format(
                        transaction.price * transaction.shares
                      )}
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
}

const mapState = state => ({
  transactions: state.transactions,
  userId: state.user.id
})

const mapDispatch = dispatch => ({
  getTransactions: userId => dispatch(getTransactions(userId))
})

export default connect(mapState, mapDispatch)(Transactions)
