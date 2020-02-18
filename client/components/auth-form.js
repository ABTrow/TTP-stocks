import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {authError, clearErrors} from '../store/errors'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="form-box">
      <form className="auth-form" onSubmit={handleSubmit} name={name}>
        <h1>{displayName}</h1>
        <br />
        {name === 'signup' && (
          <div>
            <input name="fullName" type="text" placeholder="Full Name" />
          </div>
        )}
        <div>
          <input name="email" type="text" placeholder="email" />
        </div>
        <div>
          <input name="password" type="password" placeholder="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error &&
          error.response && (
            <div className="error"> {error.response.data} </div>
          )}
      </form>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Sign In',
    error: state.errors.authError
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Register',
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
    },
    clearErrors: () => dispatch(clearErrors())
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
