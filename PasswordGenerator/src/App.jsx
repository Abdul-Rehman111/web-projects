
import { useState,useCallback, useEffect,useRef } from 'react'
import './App.css'

function App() {
const [length,setlength]=useState(8)
const[numberallowed,setnumberallowed]=useState(false)
const[charallowed,setcharallowed]=useState(false)
const[password,setpassword]=useState("")

//we had to use a variable to use useref hook
const passwordref=useRef(null)

const passwordgenerator=useCallback(()=>{
  let pass=""
  let str="A B C D E F G H I J K L M N O P Q R S T U V W X Y Za b c d e f g h i j k l m n o p q r s t u v w x y z"
  if(numberallowed){
    str+="0123456789"
  }
  if(charallowed){
    str+="@lph@b3t$ & $p3ci@l Ch@r@ct3r$!"
  }

  for (let i = 1; i <= length; i++) {
    let char=Math.floor(Math.random()*str.length+1)
    pass+=str.charAt(char)
    
  }
  setpassword(pass)
},
  [length,numberallowed,charallowed])

  useEffect(()=>{
    passwordgenerator()
  },[length,numberallowed,charallowed,passwordgenerator])

  const copypasswordtoclickboard=useCallback(()=>{
    passwordref.current?.select()

    //? in below statement means that optionally select the value
    passwordref.current?.setSelectionRange(0,101)

    window,navigator.clipboard.writeText(password)
  },[password])
  return (
    <>
    <h1 className='text-4xl text-center text-white'>Password Generator</h1>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500
     bg-gray-700'>
     <div className='flex shadow rounded-lg overflow-hidden mb-4'>
    <input
      type="text"
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='password'
      readOnly
      ref={passwordref}
    />
    <button 
    onClick={copypasswordtoclickboard}
    className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
     </div> 

     <div className='flex text-sm gap-x-2'>
     <div className='flex items-center gap-x-1'>
     <input type="range" 
      min={6}
      max={100}
      value={length}
      className='cursor-pointer'
      onChange={(e)=>{
        setlength(e.target.value)
      }}
     />
     <label>length:{length}</label>
     </div>

     <div className='flx items-center gap-x-1'>
      <input
      type="checkbox"
      defaultChecked={numberallowed}
      id="numberinput"
      onChange={()=>{
        setnumberallowed((prev)=>!prev)
      }}
       />

       <label htmlFor='numberInput'>Numbers</label>
     </div>
     </div>
     
     <div className='flex items-center gap-x-1'>
     <input
     type="checkbox"
     defaultChecked={charallowed}
     id="characterInput"
     onChange={()=>{
      setcharallowed((prev)=>!prev)
     }}/>
     
     <label htmlFor='characterInput'>characters</label>
     </div>
     </div>
    </>
  )
}

export default App
