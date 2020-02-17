const defaultState = {
  buyError: {},
  authError: {}
}

const BUY_ERROR = 'BUY_ERROR'
const GOT_QUOTE = 'GO,T_QUOTE'
const GOT_HOLDINGS = 'GOT_HOLDINGS'
const AUTH_ERROR = 'AUTH_ERROR'

export const buyError = errorMessage => ({type: BUY_ERROR, errorMessage})
export const authError = errorMessage => ({type: AUTH_ERROR, errorMessage})

export default function(state = defaultState, action) {
  switch (action.type) {
    case BUY_ERROR:
      return {...state, buyError: action.errorMessage}
    case GOT_QUOTE:
      return {...state, buyError: {}}
    case GOT_HOLDINGS:
      return {...state, buyError: {}}
    case AUTH_ERROR:
      return {...state, authError: action.errorMessage}
    default:
      return state
  }
}
