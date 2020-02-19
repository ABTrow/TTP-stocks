import axios from 'axios'
import {updateCash} from './user'
import {buyError} from './errors'

const GOT_HOLDINGS = 'GOT_HOLDINGS'
const REMOVE_USER = 'REMOVE_USER'

const gotHoldings = (holdings, totalValue) => ({
  type: GOT_HOLDINGS,
  holdings,
  totalValue
})

export const getHoldings = userId => async dispatch => {
  try {
    let {data} = await axios.get(`/api/users/${userId}/holdings`)
    let formattedPortfolio = data.portfolio.map((holding, idx) => {
      return {...holding, stockInfo: data.portfolioInfo[idx]}
    })
    let totalValue = formattedPortfolio.reduce((a, b) => {
      return a + b.shares * b.stockInfo.latestPrice
    }, 0)
    dispatch(gotHoldings(formattedPortfolio, totalValue))
  } catch (error) {
    console.error(error)
  }
}

export const buyStock = (symbol, shares) => async dispatch => {
  try {
    let {data} = await axios.post(`api/transactions`, {symbol, shares})
    await dispatch(getHoldings(data.id))
    dispatch(updateCash(data.cash))
  } catch (error) {
    dispatch(buyError(error))
  }
}

/**
 * REDUCER
 */

const defaultState = {holdings: null, totalValue: 0}

export default function(state = defaultState, action) {
  switch (action.type) {
    case REMOVE_USER:
      return defaultState
    case GOT_HOLDINGS:
      return {holdings: [...action.holdings], value: action.totalValue}
    default:
      return state
  }
}
