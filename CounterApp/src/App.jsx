import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let [counter,setcounter]=useState(15)

  let addvalue=()=>{
setcounter(counter+1)

//important for interview perspective
/*setcounter(prevcounter=>prevcounter+1)
setcounter(prevcounter=>prevcounter+1)
setcounter(prevcounter=>prevcounter+1)
setcounter(prevcounter=>prevcounter+1)*/
}

let removevalue=()=>{
  setcounter(counter-1)
}
  return (
    <>
     <h1>Chai aur react</h1>
     <h2>Counter Value:{counter}</h2>
     <button onClick={addvalue}>Add value</button>
     <br/>
     <button onClick={removevalue}>Remove value</button>
    </>
  )
}

export default App
