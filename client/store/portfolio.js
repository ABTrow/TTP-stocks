import axios from 'axios'

const GOT_HOLDINGS = 'GOT_HOLDINGS'
const BOUGHT_STOCK = 'BOUGHT_STOCK'

const gotHoldings = holdings => ({type: GOT_HOLDINGS, holdings})
const boughtStock = stock => ({type: BOUGHT_STOCK, stock})

export const getHoldings = userId => async dispatch => {
  try {
    let {data} = await axios.get(`/api/users/${userId}/holdings`)
    dispatch(gotHoldings(data))
  } catch (error) {
    console.error(error)
  }
}

export const buyStock = (symbol, shares) => async dispatch => {
  try {
    let {data} = await axios.post(`api/transactions`, {symbol, shares})
    console.log(data)
    dispatch(boughtStock({...data.holding, stock: data.stock}))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GOT_HOLDINGS:
      return [...action.holdings]
    case BOUGHT_STOCK:
      return [...state, action.stock]
    default:
      return state
  }
}
