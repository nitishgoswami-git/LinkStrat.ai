import React from 'react'


const MainLayout = ({component1, component2}) => {
  return (
    <div className='flex'>
        {component1}
        {component2}
    </div>
  )
}

export default MainLayout
