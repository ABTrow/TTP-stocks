import axios from 'axios'
import {buyError} from './errors'

const GOT_QUOTE = 'GOT_QUOTE'
const REMOVE_USER = 'REMOVE_USER'

const gotQuote = stock => ({type: GOT_QUOTE, stock})

export const getQuote = symbol => async dispatch => {
  try {
    let {data} = await axios.get(`api/stocks/${symbol}`)
    dispatch(gotQuote(data))
  } catch (error) {
    dispatch(buyError(error))
  }
}

export default function(state = {}, action) {
  switch (action.type) {
    case REMOVE_USER:
      return {}
    case GOT_QUOTE:
      return action.stock
    default:
      return state
  }
}
