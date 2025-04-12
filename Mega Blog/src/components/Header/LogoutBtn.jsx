import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
/*LogoutBtn is used to find out the users that are 
login or not*/

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
         /*logout function is a promise so that we use
         then below you can also use catch below*/

        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn