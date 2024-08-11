import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import { Outlet } from 'react-router-dom'

function Layout() {
/*outlet function is that where it is used the upper and downward content is same as in below example
Header and Footer is same*/
  return (
    <>
    <Header />
    <Outlet />
    <Footer />

    </>
  )
}

export default Layout
