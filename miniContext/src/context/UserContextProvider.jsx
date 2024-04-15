import React, { useState } from 'react'
import UserContext from './UserContext'

const UserContextProvider=({children})=>{
    const [user,setUser]=useState(null)
return(

    //prop is used in usercontext in the form of value
    <UserContext.Provider value={{user,setUser}}>
        {children}
    </UserContext.Provider>
)
}

export default UserContextProvider