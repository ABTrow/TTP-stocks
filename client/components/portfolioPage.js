import React from 'react'
import {Portfolio, Purchase} from '.'
import {connect} from 'react-redux'

const PortfolioPage = props => {
  let date = new Date()

  return (
    <div>
      <div id="portfolio-header">
        <h1 className="page-header">
          Portfolio - ${(props.portfolioValue + props.userCash).toFixed(2)}
        </h1>
        <small>
          as of {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
        </small>
      </div>
      <div id="portfolio-page">
        <Portfolio />
        <div id="portfolio-page-divider" />
        <Purchase />
      </div>
    </div>
  )
}

const mapState = state => ({
  portfolioValue: state.portfolio.value,
  userCash: state.user.cash
})

export default connect(mapState, null)(PortfolioPage)
