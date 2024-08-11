import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
function Github() {
    /*The useLoaderData hook in React Router v6 is a powerful tool that allows you to fetch data
     for your routes before they are rendered. This data can then be used by your components to 
     render the page content.*/
    const data=useLoaderData()
    // const[data,setData]=useState([])
    // useEffect(()=>{
     
    //     fetch('https://api.github.com/users/Abdul-Rehman111')
    //     .then(response=>response.json())
    //     .then(data=>{
    //         console.log(data)
    //         setData(data)
    //     })
    // },[])
  return (
    <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>
      Github followers:{data.followers}
      <img src={data.avatar_url} alt="Git Picture" width={300} />
    </div>
  )
}

export default Github


export const githubinfoloader=async()=>{
     const response=await fetch('https://api.github.com/users/Abdul-Rehman111')
     return response.json()
}