import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-container">
      <Link to="/">
        <img
          src="https://cdn2.iconfinder.com/data/icons/ios7-inspired-mac-icon-set/512/Calculator_512.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>

      <div className="button-container">
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
