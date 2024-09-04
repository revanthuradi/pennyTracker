import { useEffect, useState } from 'react'
import { IoIosHome } from "react-icons/io";
import { IoFastFood } from "react-icons/io5";
import { FaCarAlt } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { BiSolidParty } from "react-icons/bi";
import { IoShirtSharp } from "react-icons/io5";
import { GiTomato } from "react-icons/gi";
import { TbDotsCircleHorizontal } from "react-icons/tb";
import { FaMoneyBill } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import moment from 'moment'
import formatNumberIndian from '../Hooks/formatter.js'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../Context/AuthContext.jsx';

const TransactionCard = ({ transaction }) => {
    const { setEditTransaction } = useAuth()
    const [IconComponent, setIconComponent] = useState(null)
    const [showMoreOptions, setShowMoreOptions] = useState(false)
    const categories = [
        { name: "food", icon: IoFastFood },
        { name: "travel", icon: FaCarAlt },
        { name: "shopping", icon: IoShirtSharp },
        { name: "groceries", icon: GiTomato },
        { name: "housing", icon: IoIosHome },
        { name: "education", icon: FaBook },
        { name: "health care", icon: MdHealthAndSafety },
        { name: "entertainment", icon: BiSolidParty },
        { name: "salary", icon: FaMoneyBill },
        { name: "others", icon: TbDotsCircleHorizontal },
    ];
    const handleTap = async (e) => {
        e.stopPropagation()
        setShowMoreOptions(!showMoreOptions)
    }
    const handleEdit = (e) => {
        e.stopPropagation()
        setEditTransaction(transaction)
    }
    const handleDelete = async (e) => {
        e.stopPropagation()
        try {
            const res = await axios.delete(`https://penny-tracker-server.vercel.app/api/deletetransaction?transactionId=${transaction?._id}`)
            toast.success(res?.data?.message)
        } catch (err) {
            toast.error(err?.response?.data?.message)
            console.log(err)
        }
    }


    useEffect(() => {
        const categoryItem = categories.find(item => item.name === transaction?.category);
        if (categoryItem) {
            setIconComponent({ icon: categoryItem.icon });
        } else {
            setIconComponent({ icon: TbDotsCircleHorizontal });
        }
    }, [transaction.category]);

    return (
        <>

            <div className=' bg-[#ede7f0] px-3 py-2 rounded-lg mt-2 transition-all ease-in duration-200  ' onClick={handleTap} onBlur={() => setShowMoreOptions(false)}>
                <div className='flex justify-between '>
                    <div className='flex items-center gap-2'>
                        <div className='bg-darkPurple px-2 py-2 rounded-full '>
                            {IconComponent && <IconComponent.icon className='text-lg text-white' />}
                        </div>
                        <div>
                            <p className='font-semibold capitalize'>{transaction.text}</p>
                            <p className='capitalize'>{transaction?.category}</p>
                        </div>
                    </div>
                    <div className='text-end'>
                        <h2 className={`${transaction?.cashOut ? "text-red-600" : "text-green-600"}  font-semibold`}>
                            {transaction?.cashOut ? <span>-</span> : <span>+</span>}
                            {formatNumberIndian(transaction?.amount)}
                        </h2>
                        <p className='text-sm text-gray-500'>{moment(transaction?.createdAt).format("MMM Do YY")}</p>
                    </div>
                </div>
                {
                    showMoreOptions && <div className='flex justify-end py-2 gap-2  text-xl'>
                        <MdEdit className='cursor-pointer' onClick={handleEdit} />
                        <MdDelete className='cursor-pointer' onClick={handleDelete} />
                    </div>
                }
            </div>
        </>
    )
}

export default TransactionCard
