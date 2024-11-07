import React, { useId } from "react";

/*all the things is wrapped up in forwardref which 
is used for referencing*/
const Input = React.forwardRef(function Input({
   Label, 
   type = "text", 
   className = "", 
   ...props },ref
) {

  const id= useId();
  return (
    <div className="w-full">
      {Label && 
      (<Label 
        htmlFor={id} 
        className="inline-block mb-1 pl-1">
        {Label}

        <Input
        type={type}
        className={` px-3 py-2 rounded-lg
         bg-white text-black outline-none
          focus:bg-gray-50 duration-200 border
           border-gray-200 w-full $ {className}`}
        //pausing the ref here
        ref={ref}
        {...props}
        id={id}
        ></Input>
        </Label>)}
    </div>
  );
});

export default Input;
