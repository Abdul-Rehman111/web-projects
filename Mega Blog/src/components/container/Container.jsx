import React from 'react'


/*Container is used to accept the properties as a 
children children is just a name we use container 
for styling properties*/

function Container({children}) {
  return <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>;
  
}

export default Container