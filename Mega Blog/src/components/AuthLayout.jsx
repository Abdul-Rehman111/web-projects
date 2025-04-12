/*We are talking about authentication layout here it is actually
a mechanism how we protect pages and routes it is actually
a container which we decide which values we want to show
and which of them we donot want to show  */

import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)

    /*Int he below line we are asking from authstatus that
     the user is logged in or not and it is called from
     store and stored in authstatus by using this method
     we are not directly depends on the user which value
     of authentication is he passing*/

    const authStatus = useSelector(state => state.auth.status)

    
    //[] this is a dependency array in useEffect
    /*These array values will be asked by useEffect when 
    it is executed*/

    /*useEffect will tell me where i will send the user
     whether it is log in singup or homepage and gives me
     information about the changing happens in those
     fields from which i am able to detect i will check
     in or not check in */

    /*If user doesnot send anything in authentication then
     by default we assume the value is true */

    //true && false !==true
    //true && true 
    /*These upper comments are for the below statement
    whole scenario*/

    //TODO make it more easy

    /*The same below code also works the same but it is an
     easy approach*/
     /*In the below code we are asking from the authstatus
      and we are not using the authentication */
      /*The below is the codepart but i am not using it is
       only written for knowledge*/

    /* if(authStatus===true){
        navigate("/")
     }
     else if(authStatus===false){
        navigate("/login")
     }*/

     /*This is the second scenario which is a bit complex
       where we use both authstaus and authentication*/

    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false

        if(authentication && authStatus !== authentication){
            navigate("/login")
        }
        //false && true !==true
        //false && false
        else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        /*The primary purpose of setLoader(false) is to
         signal that the authentication check and any
         necessary navigation are finished. This is used to
         hide a loading indicator that was likely shown before
         the authentication check began.*/

        setLoader(false)
    }, [authStatus, navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}

