import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'

/*This is the easiest example type as compared 
to which is appeared on the web*/ 

//In the below line we use Login as AuthLogin
import {Login as authLogin} from '../store/authSlice'
import {Button,Input,Logo} from './index'
import { useDispatch } from 'react-redux'
import authService from "react-hook-form"

/*Below is the {useForm} from the web useForm where
 you use it which is avaliable online in the form of 
 ReactForms online*/
import { useForm } from 'react-hook-form'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg
         bg-gray-100 rounded-xl p-10 border
          border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block
                     w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>

        </div>
        <h2 className="text-center text-2xl font-bold 
        leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base
         text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium 
                        text-primary transition-all
                         duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>

        </p>
        {error && <p className="text-red-600 mt-8 
        text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} 
        className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {

                    /*Below are the options given 
                    which is for the Dropdown menu
                     out of which one is normal and the
                      other is Regex*/

                        /*Below is regex written 
                        which can be copied from 
                        the website or from AI tools 
                        this is the link given
                        {https://regexr.com/} 
                        where you can search here
                         or use AII tools matchpattern 
                         is the name of regex which is 
                         written from AI tool there
                         are two types of regex one is
                         pattern and the other is 
                         validate pattern is written
                         from matchPattern to {//} and 
                         the validate is written after
                         {//}
                         pattern is written and the value
                         name is written after the 
                         {test(value)} as shown before
                         in slashes*/


                        required: true,
                        validate: {
                        matchPatern: (value) =>
                         /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
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

