import {withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  
  const onClickLogout = async () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content"> 
        <p className="heading-icon">JACKFRUIT</p>
        <div className="button-container">
        <button
          type="button"
          className="logout-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
        </div>
      </div>
    </nav>
  )
}
export default withRouter(Header)