import axios from 'axios'

const GOT_TRANSACTIONS = 'GOT_TRANSACTIONS'

const gotTransactions = transactions => ({type: GOT_TRANSACTIONS, transactions})

export const getTransactions = userId => async dispatch => {
  try {
    let {data} = await axios.get(`/api/users/${userId}/transactions`)
    dispatch(gotTransactions(data))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case GOT_TRANSACTIONS:
      return [...action.transactions]
    default:
      return state
  }
}
