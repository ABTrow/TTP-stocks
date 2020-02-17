import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {authError} from '../store/errors'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="form-box">
      <form className="auth-form" onSubmit={handleSubmit} name={name}>
        {name === 'signup' && (
          <div>
            <label htmlFor="fullName">
              <small>Full Name</small>
            </label>
            <input name="fullName" type="text" />
          </div>
        )}
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <span>
        <a href="/auth/google">{displayName} with Google</a>
      </span>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.errors.authError
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.errors.authError
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit: evt => {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      let firstName, lastName

      if (formName === 'signup') {
        if (password.length < 8) {
          dispatch(
            authError({
              response: {data: 'Password must be at least 8 characters'}
            })
          )
          return
        }
        const splitIndex = evt.target.fullName.value.lastIndexOf(' ')
        if (splitIndex < 1) {
          dispatch(
            authError({response: {data: 'Must enter a First and Last Name'}})
          )
          return
        }
        firstName = evt.target.fullName.value.slice(0, splitIndex)
        lastName = evt.target.fullName.value.slice(splitIndex + 1)
      }

      dispatch(auth(email, password, formName, firstName, lastName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
