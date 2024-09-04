import React from 'react'
import { useAuth } from '../Context/AuthContext'
import { GoSignOut } from "react-icons/go";

const Acount = () => {
  const { userData, setCurrencySymbol, signOut } = useAuth()
  const currencyOptions = [
    { code: 'IND', name: 'select', symbol: '₹' },
    { code: 'IND', name: 'Indian Rupee', symbol: '₹' },
    { code: 'USD', name: 'United States Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'GBP', name: 'British Pound Sterling', symbol: '£' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
    { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
  ];
  const handleCurrencyChange = (e) => {
    localStorage.setItem('currency-symbol', e.target.value)
    setCurrencySymbol(e.target.value)
  }
  return (
    <div className='dark:text-white h-full flex justify-center '>
      <div className='lg:bg-darkPurple lg:text-white rounded-lg h-1/2 mt-10 flex flex-col items-center '>
        <div className='flex items-center gap-2 py-5 px-4  '>
          <img width="50" height="48" src="https://img.icons8.com/color/48/user-male-circle--v1.png" alt="user-male-circle--v1" />
          <h2 className='capitalize font-medium '>{userData.userName}</h2>
        </div>
        <div className='px-4 w-1/2'>
          <label htmlFor="currency">Select Currency</label>
          <select
            onChange={handleCurrencyChange}
            id="currency"
            className="peer dark:bg-darkBg dark:text-white  mt-3 h-8 cursor-pointer w-full font-Poppins rounded-[7px] border border-darkPurple dark:border-white  bg-transparent px-3   text-sm font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
            {
              currencyOptions.map(currency => <option value={currency.symbol}>{currency.name}</option>)
            }
          </select>
        </div>
        <div className='lg:mt-32 px-2 mt-10 lg:flex items-center justify-center'>
          <span className='flex gap-1 cursor-pointer' onClick={signOut}>
            <GoSignOut title='signOut' className='text-2xl font-semibold ' />
            signOut
          </span>
        </div>
      </div>
    </div>
  )
}

export default Acount
