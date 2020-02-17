import React from 'react'
import {Portfolio, Purchase} from '.'
import {connect} from 'react-redux'

const PortfolioPage = props => {
  return (
    <div>
      <h1>Portfolio - ${props.portfolioValue}</h1>
      <div id="portfolio-page">
        <Portfolio />
        <Purchase />
      </div>
    </div>
  )
}

const mapState = state => ({
  portfolioValue: state.portfolio.value
})

export default connect(mapState, null)(PortfolioPage)
