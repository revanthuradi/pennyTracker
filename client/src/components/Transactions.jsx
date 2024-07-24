import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/AuthContext'
import TransactionCard from './TransactionCard'
import Loader from '../components/Loader'
import PDF from './PDF';
import { TfiStatsDown } from "react-icons/tfi";
import { TfiStatsUp } from "react-icons/tfi";
import formatNumberIndian from '../Hooks/formatter.js'

const Transactions = () => {
  const { userData } = useAuth()
  const [pageTrasactions, setPageTrasactionsTransactions] = useState([])
  const [isLoading, setIsloading] = useState(false)
  const [balance, setBalance] = useState({})
  const [transactionType, setTransactionType] = useState('today')
  const fetchTransactions = async () => {
    try {
      setIsloading(true)
      const res = await axios.get(`https://penny-tracker-server.vercel.app/api/gettransactions/${transactionType}?id=${userData._id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      let income = 0
      let expenses = 0
      res.data.transactions.forEach((transaction) =>
        transaction.cashIn
          ? (income += transaction.amount)
          : (expenses += transaction.amount)
      );

      setBalance({
        ...balance,
        income,
        expenses
      })
      setPageTrasactionsTransactions(res.data.transactions)

      setIsloading(false)
    } catch (error) {
      setIsloading(false)
      console.log(error)
    } finally {
      setIsloading(false)

    }
  }
  useEffect(() => {
    const fetchData = async () => {
      await fetchTransactions()
    }
    fetchData()
  }, [transactionType])

  return (
    <div className='h-full  '>
      <div className='h-[10%] dark:text-white  flex py-5 px-3 justify-between items-center'>
        <h2 className='text-lg font-medium'>Transactions</h2>
        <div className='flex items-center gap-4'>
          <div className="relative  h-8  min-w-[100px] font-Poppins">
            <select
              onChange={(e) => setTransactionType(e.target.value)}
              className="peer dark:bg-darkBg  h-full cursor-pointer w-full font-Poppins rounded-[7px] border border-darkPurple dark:border-white  bg-transparent px-3   text-sm font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
              <option value="today">Today</option>
              <option value="all">All</option>
              <option value="yesterday">Yesterday</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div>
            <PDF transactions={pageTrasactions} />
          </div>
        </div>
      </div>
      <div className='h-[8%]  flex justify-evenly items-center px-4  py-2 '>
        <div className='bg-[#D3EBEB] font-semibold min-w-24 flex gap-2 items-center px-4 py-2 rounded-lg'>
          <h2> {formatNumberIndian(balance?.income)}</h2>
          <TfiStatsUp />
        </div>
        <div className='bg-[#FEE4FF] font-semibold min-w-24  flex gap-2 items-center px-4 py-2 rounded-lg'>
          <h2> {formatNumberIndian(balance?.expenses)}</h2>
          <TfiStatsDown />
        </div>
      </div>
      <div className='overflow-y-scroll w-[95%]  h-[82%] px-3 pb-2 lg:w-[50%] m-auto'>
        {
          isLoading ? <Loader /> : pageTrasactions.length === 0 ? <h2 className='text-lg font-semibold dark:text-white text-center mt-10'>No Transactions Availabe</h2> : pageTrasactions.map(transaction => <TransactionCard transaction={transaction} />)
        }
      </div>
    </div>
  )
}

export default Transactions
