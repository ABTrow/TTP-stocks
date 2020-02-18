import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav>
      <h1>TTP - Stocks</h1>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these NavLinks after you log in */}
          <NavLink activeClassName="active-link" to="/portfolio">
            Portfolio
          </NavLink>
          <NavLink activeClassName="active-link" to="/transactions">
            Transactions
          </NavLink>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these NavLinks before you log in */}
          <NavLink activeClassName="active-link" to="/login">
            Sign In
          </NavLink>
          <NavLink activeClassName="active-link" to="/signup">
            Register
          </NavLink>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
