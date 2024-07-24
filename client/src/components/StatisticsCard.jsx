import React, { useState } from 'react'
import { TfiStatsDown } from "react-icons/tfi";
import { TfiStatsUp } from "react-icons/tfi";
import formatNumberIndian from '../Hooks/formatter.js'
const StatisticsCard = ({ income, expenses }) => {
    return (
        <div className=''>
            <div className='flex justify-around  items-center'>
                <div className='bg-[#D3EBEB] text-center h-fit py-2 px-6 rounded-xl '>
                    <p className='text-lg text-gray-500'>Money In</p>
                    <div className='flex items-center justify-center gap-2 text-xs'>
                        <h2 className='text-xl font-semibold '>{formatNumberIndian(income)}</h2>
                        <TfiStatsUp />
                    </div>
                </div>
                <div className='bg-[#FEE4FF]  h-fit py-2 px-6 rounded-xl '>
                    <p className='text-lg  text-gray-500'>Money Out</p>
                    <div className='flex  items-center justify-center gap-2 text-xs'>
                        <h2 className='text-xl font-semibold text-center '>{formatNumberIndian(expenses)}</h2>
                        <TfiStatsDown />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatisticsCard