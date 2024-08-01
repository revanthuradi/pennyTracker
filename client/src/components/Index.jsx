import React, { useEffect, useState } from 'react'
import UserCard from './UserCard'
import { useAuth } from '../Context/AuthContext'
import axios from 'axios'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';
import Loader from '../components/Loader'
import TransactionCard from './TransactionCard';
import StatisticsCard from './StatisticsCard';
import formatNumberIndian from '../Hooks/formatter.js'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Index = () => {
  const [recentTransactions, setRecentTransactions] = useState([])
  const [isLoading, setIsloading] = useState(false)
  const [balance, setBalance] = useState({})
  const [showBalance, setShowBalance] = useState(true)
  const { userData } = useAuth()
  const fetchRecentTransactions = async () => {
    try {
      setIsloading(true)
      const res = await axios.get(`https://penny-tracker-server.vercel.app/api/gettransactions/recent?id=${userData._id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      const res2 = await axios.get(`https://penny-tracker-server.vercel.app/api/totalbalance?id=${userData._id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      setBalance(res2?.data?.balance)
      setRecentTransactions(res?.data?.transactions)
      setIsloading(false)
    } catch (err) {
      setIsloading(false)
      console.log(err)
      toast.error('something went wrong')
    }
  }

  useEffect(() => {
    fetchRecentTransactions()
  }, [])
  return (
    <div className='font-Poppins  lg:flex justify-center'>
      <div className=' lg:w-[70%]  '>
        <UserCard />
        <div className='w-full'>
          <div className='text-white lg:w-[60%] rounded-xl bg-darkPurple w-[93%]  m-auto px-4 py-5'>
            <div className='flex  justify-between'>
              <div>
                <h2 className=' font-titanium text-2xl tracking-wider'>{!isLoading && showBalance ? formatNumberIndian(balance?.income - balance?.expenses) : "...XXXXX"}</h2>
                <p className=''>Total Balance</p>
              </div>
              <div className='mr-4 mt-1'>
                {
                  showBalance ? <FaEyeSlash className='text-lg' onClick={() => setShowBalance(!showBalance)} /> : <FaEye className='text-lg' onClick={() => setShowBalance(!showBalance)} />
                }
              </div>
            </div>
            <h2 className='mt-5'>{userData?.userName.toUpperCase()}</h2>
          </div>
        </div>
        {/* {statistics} */}
        <div className='px-4 mt-4 '>
          <h2 className='text-lg mb-1 dark:text-white font-semibold'>Statistics</h2>
          <StatisticsCard showBalance={showBalance} income={balance?.income} expenses={balance?.expenses} />
        </div>
        {/* {recent transactions} */}
        <div className='px-4 mt-4'>
          <div className='flex justify-between '>
            <h2 className='text-lg font-semibold dark:text-white '>Recent Transactions</h2>
            <Link to='/transactions' className='text-gray-500'>View all</Link>
          </div>
          <div className='lg:w-[70%] lg:m-auto'>
            {
              isLoading && <Loader />
            }
            {
              !isLoading && recentTransactions.length !== 0 ? (recentTransactions.map(transaction => <TransactionCard transaction={transaction} />)) : <h2>No Recent Transactions</h2>
            }
          </div>
        </div>

      </div>
    </div>
  )
}

export default Index
