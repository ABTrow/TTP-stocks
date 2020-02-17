import axios from 'axios'
import {buyError} from './errors'

const GOT_QUOTE = 'GOT_QUOTE'

const gotQuote = stock => ({type: GOT_QUOTE, stock})

export const getQuote = symbol => async dispatch => {
  try {
    let {data} = await axios.get(`api/stocks/${symbol}`)
    dispatch(gotQuote(data))
  } catch (error) {
    dispatch(buyError(error.response.data))
  }
}

export default function(state = {}, action) {
  switch (action.type) {
    case GOT_QUOTE:
      return action.stock
    default:
      return state
  }
}
