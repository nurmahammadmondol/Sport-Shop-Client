import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaBox, FaMoneyBillWave, FaUsers, FaUserCheck } from 'react-icons/fa';
import axoissecure from '../../share/Axoisecure';

export default function Dhome() {


    const { data: item = [], refetch } = useQuery({
        queryKey: ["pro"],
        queryFn: async () => {
            try {
                const res = await axoissecure.get(`/products`);
                return res?.data?.data || [];
            } catch (error) {
                console.error("Error fetching products:", error);
                throw error;
            }
        },
    });


    const { data: seller = [], } = useQuery({
        queryKey: ["pro"],
        queryFn: async () => {
            try {
                const res = await axoissecure.get(`/register`);
                return res?.data?.sellers || [];
            } catch (error) {
                console.error("Error fetching products:", error);
                throw error;
            }
        },
    });

    const stats = [
        // { id: 1, title: 'Total Items', value: item?.length, icon: <FaBox className="text-4xl text-blue-500" /> },
        // { id: 2, title: 'Total Sales', value: 53000, icon: <FaMoneyBillWave className="text-4xl text-green-500" /> },
        { id: 3, title: 'Total Sellers', value: seller?.length, icon: <FaUsers className="text-4xl text-yellow-500" /> },
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
