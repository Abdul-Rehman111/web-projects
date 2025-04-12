import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

/*we use Login as AuthLogin here this is a scenario which
 is used in big companies also*/

import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"

/*This below line code is used for the react hook form which
 is basically used in this whole document*/
/*before writing all this code must read the documentation
 of react-hook-form*/

import {useForm} from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")

            /*setError is used to cleans all the error while the form is
       started this is a good method and you must use in
        every Login forms it is a good practice */

      /*In the below line we are using the method which is
       basically located in the authService we are using 
       that method here and the method gives the session 
       so in the form of data so we store the data in the
       session variable for the better understanding */

       /*If the session is recieved so the user is loggedin if
        the session is not recieved so the user is not login
        there */

        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData)
                {
                dispatch(authLogin(userData));
                navigate("/")
                
           /*In the above line The user is navigated to route
           after the condition is fulfilled if i use Link
           here it is ot navigated by its own we had to
           click there efore going there the route by
           using navigate we ill divert the user
           programatically that is use here is basically
           the routing which we use fterwards in app.jsx*/
            }}
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>

        
        /*handleSubmit is a method which comes from the
         reacthookforms it is basically a keyword so avoid 
         it to make the functions of this name make the
         function of any name this is basically the builtin
         method reacthookform when the fporm is submitted 
         handleSubmit is basically the event and it is 
         called when the form is being submitted This
         function is important because the input fields that
         exists there where we use the register so
         the values that i had written there I donot had
         to manage the state of those variables the
         register will aiutomatically pick all the
         values and when handleSubmit is being executed it
         will take all the values by its own and use them */

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
            /*The below input is the input which is 
            basically the input method*/
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"

                
         /*If you donot write ...register in js below the
         thing happens is that if you use register any where
         in another input field the value of register is
         being overwrite so basically it is must to use
         {...register} here and ... is a spread operator in
         js which will spread all the values below the name
         below email and the other names that is being used
         in register must be unique to avoid any conflict
         the first value in the {...register} is the key 
         value and the second is the object and you pass
         the options in this object if you read the 
         documentation you find out many options there
         the validate below is the pattern and you can write
         which pattern it should match*/

         /*The below 3 to 4 lines code is being written by
           chatgpt so that it can manage how the email is
           being stored*/

          /*The value inside the matchPattern is regex 
          regular expression you can take regex expression 
          from the given link website just search it and the
          regex of the value is being displayed on the
          website as the email regex is being used below
          (https://regexr.com/) you can use this website or
          used chatgpt or the other tools for the regex
          expressions*/

          // (||) this is an OR operator

          /*All the below regex that is being used is firstly
           read from the documentation of reacthookforms 
           and then it is being written*/

 
           //validation from react hook form is used below see that documentation
           //...register is a spread operator and it must be used in reacthook forms
           //options are passed in the form of object below with email

                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                
                /*The below Input method is that which is from the
                components*/
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login