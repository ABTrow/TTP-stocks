const defaultState = {
  buyError: ''
}

const BUY_ERROR = 'BUY_ERROR'
const GOT_QUOTE = 'GOT_QUOTE'

export const buyError = errorMessage => ({type: BUY_ERROR, errorMessage})

export default function(state = defaultState, action) {
  switch (action.type) {
    case BUY_ERROR:
      return {...state, buyError: action.errorMessage}
    case GOT_QUOTE:
      return {...state, buyError: ''}
    default:
      return state
  }
}
