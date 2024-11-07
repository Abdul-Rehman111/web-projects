import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

/*Filename and the function could be not the 
same because it donot make a diff*/
export default function 
Protected({ children, authentication = true }) {

    const navigate = useNavigate()

    /*In the below line you can also set the loader
     to false and use loading and setloading to be 
     true*/


    const [loader, setLoader] = useState(true)
    /*In the below line we are demanding from the store
     whether the user is logged in or not*/


    const authStatus = useSelector
    (state => state.auth.status)


    /*UseEffect will tell me where i decide whether
     i had to send the user to signup page,loginpage
      etc*/

    useEffect(() => {

        /*This below ios the scenario you can use it 
        if you want other wise another method is 
        avaliable*/

        
        /* TODO: make it more easy to understand

         if (authStatus ===true){
             navigate("/")
         } else if (authStatus === false) {
             navigate("/login")
         }

        let authValue = authStatus === true ? true : false*/

        if (authentication && authStatus 
            !== authentication) {
            navigate("/login")
        } else if (!authentication 
            && authStatus !== authentication) {
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

    return loader ? <h1>Loading...</h1> : <>{children}
    </>
}

