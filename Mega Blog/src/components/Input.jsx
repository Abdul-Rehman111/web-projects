import React, {useId} from 'react'


 /*ForwardRef in React Hooks lets you create a reference
 to a child component. This allows you to control the
 child component from its parent, making it useful for
 custom input components and other scenarios where
 you need to interact with the DOM.*/

 //All the below code is wrapped up in forwardref

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label 
            className='inline-block mb-1 pl-1' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            //type text is set by default
            type={type}
            
            /*This below classname is passed because whatever
             the user passes the value it is filled inside the 
             Input box*/

             /*in `` you can write css basically it is an 
             indication that your javascript starts from here
             Backticks in JavaScript are used to create strings 
             that can span multiple lines and include variables 
             directly within them. This makes your code more 
             readable and easier to write.*/
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            
            /*ref is sued which we take from the user as a prop
            this is the same thing which gives reference of it
            to the parent component and we use forwardref for
            this purpose only the ref is passed from below
            and the state access id taken by it due to which
            we will take the input whatever is made written
            inside the inputbox if you donot do this we 
            will not be able to implement onClick and the
            other methods*/
            ref={ref}
            
            /*This below ...props is used if the user wants to
            give some of the values as the props */
            {...props}
            id={id}
            />
        </div>
    )
    // Added closing parenthesis here
})

export default Input