import React from 'react'
import {Portfolio, Purchase} from '.'
import {connect} from 'react-redux'

const PortfolioPage = props => {
  let date = new Date()

  return (
    <div>
      <h1>Portfolio - ${(props.portfolioValue + props.userCash).toFixed(2)}</h1>
      <small>
        as of {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
      </small>
      <div id="portfolio-page">
        <Portfolio />
        <Purchase />
      </div>
      <small>
        <a href="https://iexcloud.io">Data provided by IEX Cloud</a>
      </small>
    </div>
  )
}

const mapState = state => ({
  portfolioValue: state.portfolio.value,
  userCash: state.user.cash
})

export default connect(mapState, null)(PortfolioPage)
