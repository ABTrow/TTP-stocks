import axios from 'axios'

const GOT_QUOTE = 'GOT_QUOTE'

const gotQuote = stock => ({type: GOT_QUOTE, stock})

export const getQuote = symbol => async dispatch => {
  try {
    let {data} = await axios.get(`api/stocks/${symbol}`)
    console.log(data)
    dispatch(gotQuote(data))
  } catch (error) {
    console.error(error)
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
