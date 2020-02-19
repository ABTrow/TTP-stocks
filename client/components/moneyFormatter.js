/*
  generates a formatter that will turn floats provided by the API into properly
  formatted US Dollar values
*/

const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

export default moneyFormatter
