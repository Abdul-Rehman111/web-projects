import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'

//Link is used for redirection
import { Link } from 'react-router-dom'


/*useSelector is used to check in the store whether the
 user is logged in the app or not useNavigate is used
  for navigation*/

import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  {/*Below line is used for the authentication which is
  fetched from the state*/}
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  /*whenever production grage apps navbar is designed
   we used an array and then the loop is applied on it*/

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]


  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'   />

              </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 

            //if and else statement is written below

            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}

            {/*below code is used for the logout functionality*/}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header