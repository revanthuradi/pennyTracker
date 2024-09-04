import React, {  useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../Context/AuthContext'
import AddTransaction from '../components/AddTransaction'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const { isAuthenticated, openAddTransaction, darkMode, editTransaction, } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated])

    useEffect(() => {
        if (darkMode === 'light') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [darkMode])

    return (
        <div className='h-[100vh] w-full dark:bg-darkBg font-Poppins'>
            <div className='h-[92%] lg:w-[70%] lg:m-auto  '>
                <Outlet />
            </div>
            <div className=' h-[8%] '>
                <Navbar />
            </div>
            {
                (openAddTransaction || editTransaction) && <AddTransaction />
            }
        </div>
    )
}

export default Home
