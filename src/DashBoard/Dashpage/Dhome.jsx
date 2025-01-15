import React from 'react';
import { FaBox, FaMoneyBillWave, FaUsers, FaUserCheck } from 'react-icons/fa';

export default function Dhome() {
    const stats = [
        { id: 1, title: 'Total Items', value: 1200, icon: <FaBox className="text-4xl text-blue-500" /> },
        { id: 2, title: 'Total Sales', value: 53000, icon: <FaMoneyBillWave className="text-4xl text-green-500" /> },
        { id: 3, title: 'Total Sellers', value: 300, icon: <FaUsers className="text-4xl text-yellow-500" /> },
        { id: 4, title: 'Active Sellers', value: 250, icon: <FaUserCheck className="text-4xl text-purple-500" /> },
    ];

    return (

        <>
            <h1 className='font font-semibold text-slate-500 und border-b-2 pb-2 text-2xl'>Overview</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4">
                {stats.map((stat) => (
                    <div
                        key={stat.id}
                        className="flex items-center p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-200"
                    >
                        <div className="mr-4">{stat.icon}</div>
                        <div>
                            <h3 className="text-xl font-bold">{stat.value}</h3>
                            <p className="text-gray-500">{stat.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>

    );
}
