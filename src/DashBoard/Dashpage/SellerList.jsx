import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import axoissecure from '../../share/Axoisecure';
import toast from 'react-hot-toast';

const SellerTable = () => {
    const [sellers, setSellers] = useState([]);
    ;




    const { data: item = [], refetch } = useQuery({
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






    const approveSeller = async (id) => {
        try {
            // Call your API to update the seller's data
            const response = await axoissecure.patch(`/register/approve/${id}`, {
                isOwnerVerified: true,
            });

            if (response.status === 200) {
                // Update the local state after successful API response

                toast.success(`Seller  approved successfully`);
            } else {
                console.error(`Failed to approve seller. Status code: ${response.status}`);
            }
        } catch (error) {
            console.error('Failed to approve seller:', error);
        }
    };




    const deleteSeller = async (id) => {

        try {
            const response = await axoissecure.delete(`/register/${id}`);
            if (response.status === 200) {
                toast.success("Seller  deleted successfully!");
                refetch();
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } catch (error) {
            if (error.status === 404) {
                toast.error("Doesn't exist... 😅!");
                refetch();
            } else if (error.status === 500) {
                toast.error("Server Error... 😅!");
            }
        } finally {

        }
    };


    return (
        <div className="p-4">

            <h1 className='font font-semibold text-slate-500 und border-b-2 pb-2 text-2xl'>Seller Request List</h1>

            <div className="mt-4 overflow-x-auto">
                <table className="min-w-full border border-gray-200 bg-white shadow-md rounded">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left px-4 py-2 border">Name</th>

                            <th className="text-left px-4 py-2 border">Store Name</th>
                            <th className="text-left px-4 py-2 border">Phone</th>
                            <th className="text-left px-4 py-2 border">Verified</th>
                            <th className="text-left px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {item?.map((seller) => (
                            <tr key={seller._id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">{seller.name}</td>

                                <td className="px-4 py-2 border">{seller.storeName}</td>
                                <td className="px-4 py-2 border">{seller.phoneNumber}</td>
                                <td className="px-4 py-2 border">
                                    {seller.isOwnerVerified === true ? (
                                        <span className="text-green-500">Verified</span>
                                    ) : (
                                        <span className="text-red-500">Not Verified</span>
                                    )}
                                </td>
                                <td className="px-4 py-2 border space-x-2">
                                    {seller.isOwnerVerified == true ? (
                                        <span className="text-gray-500">Approved</span>
                                    ) : (
                                        <button
                                            onClick={() => approveSeller(seller._id)}
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                        >
                                            Approve
                                        </button>
                                    )}

                                    <button
                                        onClick={() => editSeller(seller._id)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteSeller(seller._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SellerTable;
