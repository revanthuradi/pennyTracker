import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import { useAuth } from '../Context/AuthContext'
import formatNumberIndian from '../Hooks/formatter';
import toast from 'react-hot-toast';
import Loader from './Loader';
const Statistics = () => {
    const { userData } = useAuth()
    const [transactionType, setTransactionType] = useState('today')
    const [totalIncome, setTotalIncome] = useState(0)
    const [isloading, setIsloading] = useState(false)
    const [data, setData] = useState([])
    const colors = [
        "#A06CE5",
        "#FFA422",
        "#F3709B",
        "#68DFE3",
        "#FA5556",
        "#51CC89"
    ]
    const getStats = async () => {
        try {
            const dat = []
            setIsloading(true)
            const res = await axios.get(`https://penny-tracker-server.vercel.app/api/gettransactions/statistics/${transactionType}?id=${userData._id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            res.data.stats.forEach((stat, index) => {
                dat.push({
                    id: index,
                    value: stat.totalSpent,
                    label: stat.category,
                    color: colors[index]
                })
            })
            setTotalIncome(res.data.totalIncome)
            setData(dat)
            setIsloading(false)
        } catch (err) {
            setIsloading(false)
            toast.error('unable to fetch data')
            console.log(err)
        }
    }
    useEffect(() => {
        getStats()
    }, [transactionType])

    return (
        <div className=' h-full overflow-hidden dark:text-white'>
            <div className='px-3 pr-4 py-2 flex justify-between '>
                <div>
                    <h2 className='text-lg font-medium'>Statistics</h2>
                </div>

                <div>
                    <div className="relative  h-8  min-w-[100px] font-Poppins">
                        <select
                            onChange={(e) => setTransactionType(e.target.value)}
                            className="peer dark:bg-darkBg h-full cursor-pointer w-full font-Poppins rounded-[7px] border border-darkPurple dark:border-white  bg-transparent px-2   text-sm font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                            <option value="today">Today</option>
                            <option value="all">All</option>
                            <option value="yesterday">Yesterday</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className=''>
                {
                    isloading ? <Loader /> :
                        data.length !== 0 ? <div>
                            <div className='flex justify-center  py-6'>
                                <PieChart
                                    series={[

                                        {
                                            innerRadius: 30,
                                            outerRadius: 100,
                                            paddingAngle: 5,
                                            cornerRadius: 5,
                                            startAngle: 180,
                                            endAngle: -90,
                                            cx: 190,
                                            cy: 100,
                                            data,
                                            highlightScope: { faded: 'global', highlighted: 'item' },
                                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                        },
                                    ]}
                                    slotProps={{
                                        legend: {
                                            hidden: true
                                        },
                                    }}
                                    width={400}
                                    height={250}
                                />
                            </div>
                            <div className='text-center py-3 text-lg font-medium flex  justify-center gap-2'>
                                <p className='text-gray-500'>Total Money In :</p>
                                <p>${totalIncome}</p>
                            </div>
                            <div className='flex gap-4 flex-wrap px-6 py-3  justify-center  '>
                                {
                                    data.map(ele => <div style={{ backgroundColor: ele.color }} className={`px-2 py-2 text-darkPurple rounded-lg min-w-24 flex flex-col items-center`}>
                                        <p className='capitalize'>{ele.label}</p>
                                        <p>{formatNumberIndian(ele.value)}</p>
                                    </div>)
                                }
                            </div>
                        </div> : <div className='text-lg font-medium text-center mt-8'>No Data Available</div>
                }
            </div>
        </div>
    )
}

export default Statistics
