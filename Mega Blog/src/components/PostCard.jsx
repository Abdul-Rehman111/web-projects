import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'


/*The below $id is the syntax of appwrite thats why it is
 written like it below you can use id afterwards but it
 donot makes any sense*/

function PostCard({$id, title, featuredImage}) {
    
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>

            
      {/*getFilePreview is the method which is being used
       from the config file this method is declared there
      we used it from that config.js file */}
        
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard