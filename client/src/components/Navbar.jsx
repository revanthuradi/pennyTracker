import React from 'react'
import { Link } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
import { AiOutlineStock } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { TbMoneybag } from "react-icons/tb";
import { useAuth } from '../Context/AuthContext';
const Navbar = () => {
    const { setOpenAddTransaction } = useAuth()
    return (
        <div className='h-full w-full lg:flex justify-center  '>
            <div className='h-full lg:w-1/2 bg-darkPurple lg:rounded-lg flex px-11 justify-between  items-center  relative'>
                <div className='flex justify-between w-1/3'>
                    <Link title='Home' to=''><IoHomeOutline className='text-2xl text-white' /></Link>
                    <Link title='statistics' to='/statistics'><AiOutlineStock className='text-3xl text-white' /></Link>
                </div>
                <div onClick={() => setOpenAddTransaction()} className='absolute bottom-[50%]  left-[43%] bg-yellow px-2 py-2 rounded-full border-whiteBg dark:border-darkBg  border-[6px]'>
                    <TbMoneybag className='text-4xl cursor-pointer' title='Add Transaction' />
                </div>
                <div className='flex justify-between w-1/3'>
                    <Link title='transactions' to='/transactions'><GrTransaction className='text-2xl text-white' /></Link>
                    <Link title='profile' to='/account'><FaRegUser className='text-xl text-white' /></Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar
