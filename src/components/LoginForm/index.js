import {Component} from 'react'

import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmittedError: false,
    showUserNameError: false,
    showPasswordError: false,
    errorMsg:''
  }

  validateUserName = () => {
    const {username} = this.state
    return username !== ''
  }

  validatePassword = () => {
    const {password} = this.state
    return password !== ''
  }

  onBlurUserName = () => {
    const isValidUserName = this.validateUserName()
    this.setState({showUserNameError: !isValidUserName})
  }

  onBlurPassword = () => {
    const isValidPassword = this.validatePassword()
    this.setState({showPasswordError: !isValidPassword})
  }

  onChangeUserName = event => {
    const {target} = event
    const {value} = target
    this.setState({username: value})
  }

  onChangePassword = event => {
    const {target} = event
    const {value} = target
    this.setState({password: value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const isValidUserName = this.validateUserName()
    const isValidPassword = this.validatePassword()
    if (isValidUserName && isValidPassword) {
        const {username, password} = this.state
        const userDetails = {username, password}
        const url = 'http://localhost:3000/login'
        const options = {
            headers:{
            "content-type": "application/json",
            // 'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(userDetails),
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.ok === true) {
        this.onSubmitSuccess(data.jwtToken)
        } else {
          console.log("1")
        this.onSubmitFailure(data.error)
        }
        this.setState({isSubmittedForm: true})
    } else {
      this.setState({
        showUserNameError: !isValidUserName,
        showPasswordError: !isValidPassword,
        isSubmittedForm: false,
      })
    }
    
  }

  renderSubmittedForm = () => {
    const {
      showUserNameError,
      showPasswordError,
      username,
      password,
      errorMsg,
      showSubmitError
    } = this.state

    const errorUserName = showUserNameError ? 'error-field' : ''
    const errorPassword = showPasswordError ? 'error-field' : ''

    return (
      <form className="form-container" onSubmit={this.submitForm}>
        <div className="input-container">
          <label htmlFor="user_name" className="label-text">
            USER NAME
          </label>
          <input
            type="text"
            placeholder="User name"
            id="user_name"
            value={username}
            className={`input-field ${errorUserName}`}
            onChange={this.onChangeUserName}
            onBlur={this.onBlurUserName}
          />
        </div>
        {showUserNameError && <p className="error-message">Required</p>}
        <div className="input-container">
          <label htmlFor="password" className="label-text">
            PASSWORD
          </label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            className={`input-field ${errorPassword}`}
            onChange={this.onChangePassword}
            onBlur={this.onBlurPassword}
          />
        </div>

        {showPasswordError && <p className="error-message">Required</p>}
        <button type="submit" className="submit-button">
          Login
        </button>
        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
      </form>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="app-container">
        <h1 className="heading">LoginForm</h1>
        <div className="container">
          {this.renderSubmittedForm()}
        </div>
        
      </div>
    )
  }
}
export default LoginForm