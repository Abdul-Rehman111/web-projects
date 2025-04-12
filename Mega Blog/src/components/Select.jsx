import React, {useId} from 'react'

function Select({
    options,
    label,
    className,
    ...props
}, ref) {
    const id = useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className=''></label>}
        <select

        /*There is no diff if you pass the props now or in 
        another line */

        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}>
        
        
       /*options must be used in select tag because we had to
        loop the options because due to options we always
        recive array so by using array we will use array by
        default if any problem occurs so to avoid that
       problem in options we use array*/

        /*if we directly use map in the options and there is no
        values in the options your app must crash for resolving
        this we use the if else condition with map if you use
        this your project will optionsally crashed or maybe
       not */

        
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)