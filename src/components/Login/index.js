import {useState} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import './index.css'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const onChangeUsername = event => setUsername(event.target.value)

  const onChangePassword = event => setPassword(event.target.value)

  const onClickMaster = () => {
    setUser('Master')
  }

  const onClickStudent = () => {
    setUser('Student')
  }

  const activeMasterButton = user === 'Master' ? 'active-button' : ''
  const activeStudentButton = user === 'Student' ? 'active-button' : ''

  const submitForm = event => {
    event.preventDefault()
    const userDetails = [username, password]
    if (username === '') {
      setErrorMsg('Enter Username')
      alert('Enter UserName')
    } else if (password === '') {
      setErrorMsg('Enter Password')
      alert('Enter Password')
    } else if (user === '') {
      setErrorMsg('Select User')
      alert('Select User')
    } else {
      Cookies.get(userDetails)
      console.log(userDetails)
    }
    const {history} = props
    switch (user) {
      case 'Master':
        return history.replace('/master')
      case 'Student':
        return history.replace('/student')
      case '':
        return history.replace('/')
      default:
        return null
    }
  }

  return (
    <div className="login-container">
      <form className="form-container" onSubmit={submitForm}>
        <img
          src="https://cdn2.iconfinder.com/data/icons/ios7-inspired-mac-icon-set/512/Calculator_512.png"
          className="login-website-logo"
          alt="website logo"
        />
        <div>
          <h1>Login as</h1>
          <div className="images-container">
            <button
              type="button"
              className={`image-button ${activeMasterButton}`}
              onClick={onClickMaster}
            >
              <img
                src="https://st2.depositphotos.com/1011935/6551/v/450/depositphotos_65517721-stock-illustration-woman-teacher-near-blackboard.jpg"
                className="user-logo"
                alt="user logo"
              />
              <h1>Master</h1>
            </button>
            <button
              type="button"
              className={`image-button ${activeStudentButton}`}
              onClick={onClickStudent}
            >
              <img
                src="https://st3.depositphotos.com/1007566/13175/v/450/depositphotos_131750084-stock-illustration-student-graduation-uniform-icon.jpg"
                className="user-logo"
                alt="user logo"
              />
              <h1>Student</h1>
            </button>
          </div>
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            value={username}
            className="username-input-field"
            onChange={onChangeUsername}
            placeholder="Username"
          />
        </div>
        {console.log(user)}
        <div className="input-container">
          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            value={password}
            className="password-input-field"
            onChange={onChangePassword}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        <h1 className="login-text">
          Do not have an Account?{' '}
          <span className="span-text">
            <Link to="/signup"> SignUp</Link>
          </span>
        </h1>
        {console.log(errorMsg)}
      </form>
    </div>
  )
}

export default Login
