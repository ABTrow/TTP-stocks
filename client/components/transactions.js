import React from 'react'
import {connect} from 'react-redux'
import {getTransactions} from '../store/transactions'

class Transactions extends React.Component {
  componentDidMount() {
    this.props.getTransactions(this.props.userId)
  }

  render() {
    let {transactions} = this.props

    console.log(transactions)

    return (
      <div>
        <h1>Transactions:</h1>
        <table>
          <tbody>
            {transactions.map(transaction => {
              return (
                <tr key={transaction.id} className="transaction">
                  <td className="">{transaction.type.toUpperCase()}</td>
                  <td>
                    ({transaction.stock.symbol} - {transaction.stock.name})
                  </td>
                  <td className="right">{transaction.shares} Shares @</td>
                  <td className="right">${transaction.price.toFixed(2)}</td>
                  <td>
                    Total: $
                    {(transaction.price * transaction.shares).toFixed(2)}
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

const mapState = state => ({
  transactions: state.transactions,
  userId: state.user.id
})

const mapDispatch = dispatch => ({
  getTransactions: userId => dispatch(getTransactions(userId))
})

export default connect(mapState, mapDispatch)(Transactions)
