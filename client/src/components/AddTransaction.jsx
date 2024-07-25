import axios from 'axios'
import React, { useState } from 'react'
import { useAuth } from '../Context/AuthContext'
import toast from 'react-hot-toast'
import { IoMdCloseCircle } from "react-icons/io";
import FullLoader from './FullLoader'
const AddTransaction = () => {
    const { userData, editTransaction, setOpenAddTransaction } = useAuth()
    const initial = editTransaction ? editTransaction : {
        text: "",
        amount: "",
        category: "",
        cashIn: "",
        cashOut: "",
    }
    const [isloading, setIsloading] = useState(false)
    const categories = ["Salary", "Food", "Groceries", "Shopping", "Health Care", "Travel", "Education", "Housing", "Entertainment", "others"]
    const [transaction, setTransaction] = useState(initial)
    const handleChange = (e) => {
        setTransaction({
            ...transaction,
            [e.target.name]: e.target.value
        })
    }
    const handleTransactionType = (e) => {
        if (e.target.value === "cash-in") {
            setTransaction({
                ...transaction,
                cashIn: true,
                cashOut: false
            })
        } else {
            setTransaction({
                ...transaction,
                cashIn: false,
                cashOut: true,
            })
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setIsloading(true)
            if (editTransaction) {
                const res = await axios.put(`https://penny-tracker-server.vercel.app/api/updatetransaction?transactionId=${transaction._id}`, transaction, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                toast.success(res?.data?.message)
            } else {
                console.log("add...", transaction)
                const res = await axios.post(`https://penny-tracker-server.vercel.app/api/add?id=${userData._id}`, transaction, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                toast.success(res?.data?.message)
            }
            setTransaction({
                text: "",
                amount: "",
                category: "",
                cashIn: "",
                cashOut: "",
            })
            setIsloading(false)
        } catch (error) {
            setIsloading(false)
            toast.error('something went wrong')
            console.log(error)

        } finally {
            setIsloading(false)

        }
    }

    return (
        <div className='bg-whiteBg w-[100vw] h-[100vh] dark:bg-darkBg dark:text-white absolute top-0 z-50 overflow-hidden'>
            <div onClick={() => setOpenAddTransaction()} className='absolute right-10 top-5 cursor-pointer'>
                <IoMdCloseCircle className='text-3xl text-darkPurple dark:text-yellow' />
            </div>
            <div>
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-10" onSubmit={handleSubmit}>
                            <div className='mt-6'>
                                <input value={transaction.text} onChange={handleChange} id="text" name="text" type="text" autocomplete="text" placeholder='Enter description' required className="block dark:bg-darkBg w-full px-2 rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                            <div className="mt-6">
                                <input value={transaction.amount} onChange={handleChange} id="amount" name="amount" type="number" autocomplete="current-password" placeholder='Enter amount' required className="block dark:bg-darkBg w-full px-2 rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                            <div>
                                <div className="relative font-Poppins h-10 w-full min-w-[200px]">
                                    <select onChange={handleChange} name='category'
                                        className=" bg-white dark:bg-darkBg h-full w-full rounded-[7px]  border border-blue-gray-200  border-t-transparent bg-transparent px-3 py-2.5  text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                                        {
                                            categories.map(category => <option value={category.toLocaleLowerCase()}>{category}</option>)
                                        }
                                    </select>
                                    <label
                                        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                        Select category
                                    </label>
                                </div>
                            </div>
                            <div className='flex w-full  justify-between px-10'>
                                <div className={`${transaction.cashIn && "bg-green-600"}  border-green-700 border-2 rounded-xl overflow-hidden flex `}>
                                    <input onChange={handleTransactionType} className='w-full absolute opacity-0' type="radio" name="transaction-type" id="cash-in" value='cash-in' required checked={transaction.cashIn ? true : false} />
                                    <label htmlFor="cash-in" className='h-[100%] px-3 py-4 '>cash-in</label>
                                </div>
                                <div className={`${transaction.cashOut && "bg-red-600/70"} border-red-700/50 border-2  rounded-xl overflow-hidden flex`}>
                                    <input onChange={handleTransactionType} type="radio" name="transaction-type" id="cash-out" value='cash-out' className='w-full absolute opacity-0' required checked={transaction.cashOut ? true : false} />
                                    <label htmlFor="cash-out" className='h-[100%] px-3 py-4  '>cash-out</label>
                                </div>
                            </div>
                            <div className='flex justify-center mt-10'>
                                <button type="submit" className="flex w-[80%] justify-center rounded-md bg-yellow px-3 py-1.5 text-sm font-semibold leading-6 text-darkPurple shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">SAVE TRANSACTION</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {
                isloading && <FullLoader />
            }
        </div>
    )
}

export default AddTransaction
