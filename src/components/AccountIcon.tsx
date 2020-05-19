import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { navigate } from 'gatsby'
import React from 'react'

import { useAuth0 } from '../../plugins/gatsby-plugin-auth0'

export const AccountIcon: React.FC = () => {
  const { isAuthenticated, loading, loginWithPopup } = useAuth0()

  return isAuthenticated
    ? <LoggedInAccount />
    : loading
      ? <img alt="Loading profile data" src='static/throbber.gif' width={32} height={32} />
      : <LoginIcon triggerLogin={loginWithPopup} />
}

const LoginIcon: React.FC<any> = ({ triggerLogin }) => {
  return (
    <i className={'material-icons'} style={{ cursor: 'pointer' }} onClick={() => triggerLogin()}>person_outline</i>
  )
}


const LoggedInAccount = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const { user, logout }: any = useAuth0()

  return (
    <>
      <img className='avatar' alt="avatar" src={user?.picture} onClick={handleClick} />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => navigate('/app/profile')}>Profile</MenuItem>
        <MenuItem onClick={() => logout()}>Logout</MenuItem>
      </Menu>
    </>
  )
}
