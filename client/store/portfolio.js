import axios from 'axios'

const GOT_HOLDINGS = 'GOT_HOLDINGS'

const gotHoldings = holdings => ({type: GOT_HOLDINGS, holdings})

export const getHoldings = userId => async dispatch => {
  try {
    let {data} = await axios.get(`/api/users/${userId}/holdings`)
    dispatch(gotHoldings(data))
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
    default:
      return state
  }
}
