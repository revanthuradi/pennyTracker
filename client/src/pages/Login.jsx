import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useAuth } from '../Context/AuthContext'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import FullLoader from '../components/FullLoader';
import { Link } from 'react-router-dom'

const Login = () => {
    const { setData, setTokenValue } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { email: e.target[0].value, password: e.target[1].value };
        try {
            setIsLoading(true)
            const res = await axios.post(`https://penny-tracker-server.vercel.app/auth/login`, user)
            setData(res.data.user)
            setTokenValue(res.data.token)
            toast.success(res.data.message)
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
            console.log(err)
            toast.error(err?.response?.data?.message)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className='m-auto flex flex-col items-center gap-3'>
                    <h2 className='text-3xl font-semibold'>Penny Tracker!</h2>
                    <h2 className='text-xl font-medium'>Login to your Account</h2>
                </div>
                <form className="space-y-6 mt-3" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" autoComplete="email" required className="block px-2  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2 relative  ">
                            <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required className="block w-full rounded-md border-0 px-2 py-1.5 pr-8 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <div className='absolute right-3 bottom-3 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                                {
                                    showPassword ? <FaEyeSlash /> : <FaEye className='' />
                                }
                            </div>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-darkPurple px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-bg-darkPurple/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                    </div>
                </form>
                <div className='mt-5 text-center'><Link to='/signup' >Don't have an Account ?</Link></div>

            </div>
            {
                isLoading && <FullLoader />
            }
        </div>
    )
}

export default Login
