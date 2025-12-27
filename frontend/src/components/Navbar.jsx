import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <div  className='flex p-2 text-white items-center justify-between bg-linear-30 to-yellow-200 from-purple-400'>
        <img src='/vite.svg'/>
        <Link to='/login'>
        <button className='bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-2'>Signup/Login</button>
        </Link>
    </div>
  )
}

export default Navbar