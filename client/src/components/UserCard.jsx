import React from 'react'
import { useAuth } from '../Context/AuthContext'
import getGreeting from '../Hooks/greeting.js'
import moment from 'moment'
import { MdWbSunny } from "react-icons/md";
import { IoMoon } from "react-icons/io5";

const UserCard = () => {
  const { userData, setTheme, darkMode } = useAuth()
  return (
    <div className='flex py-3 px-2 gap-1 justify-between items-center dark:text-white '>
      <div className='flex'>
        <img width="48" height="48" src="https://img.icons8.com/color/48/user-male-circle--v1.png" alt="user-male-circle--v1" />
        <div>
          <h2 className=''>{getGreeting()} <span className='font-semibold'>{userData.userName.toUpperCase()}!</span></h2>
          <p className='text-sm text-gray-500'>{moment(new Date).format("MMM Do YY")}</p>
        </div>
      </div>
      <div className='pr-5'>
        <span className='text-2xl cursor-pointer' onClick={() => setTheme()}>
          {
            darkMode === "dark" ? <IoMoon className='text-gray-500' /> : <MdWbSunny className='text-yellow' />
          }
        </span>
      </div>
    </div>
  )
}

export default UserCard
