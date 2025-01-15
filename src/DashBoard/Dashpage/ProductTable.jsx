import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axoissecure from '../../share/Axoisecure';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const ProductTable = () => {


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

    // Delete a product



    const deleteProduct = async (id) => {

        try {
            const response = await axoissecure.delete(`/products/${id}`);
            if (response.status === 200) {
                toast.success("Product  deleted successfully!");
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
            <div className='flex border-b-2 pb-2 justify-between items-center'>
                <div>
                    <h1 className='font font-semibold text-slate-500   text-2xl'>Products List</h1>
                </div>
                <Link to={'/dashboard/addproducts'}>

                    <button

                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                    >
                        Add Product
                    </button>
                </Link>

            </div>

            <div className="mt-4 overflow-x-auto">

                <table className="min-w-full border border-gray-200 bg-white shadow-md rounded">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left px-4 py-2 border">SL</th>
                            <th className="text-left px-4 py-2 border">Category Name</th>
                            <th className="text-left px-4 py-2 border">Item Name</th>
                            <th className="text-left px-4 py-2 border">Price</th>
                            <th className="text-left px-4 py-2 border">Quntity</th>
                            <th className="text-left px-4 py-2 border">Processing Time</th>
                            <th className="text-left px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {item?.map((product, index) => (
                            <tr key={product._id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">{index + 1}</td>
                                <td className="px-4 py-2 border">{product?.CategoryName}</td>
                                <td className="px-4 py-2 border">{product?.ItemName}</td>
                                <td className="px-4 py-2 border">{product?.Price}</td>
                                <td className="px-4 py-2 border">{product?.quntity || 'Stock Out'}</td>
                                <td className="px-4 py-2 border">{product?.ProcessingTime} Day</td>
                                <td className="px-4 py-2 border space-x-2">


                                    <Link to={`/dashboard/updateproducts/${product?._id}`}>
                                        <button

                                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                        >
                                            Edit
                                        </button>

                                    </Link>

                                    <button
                                        onClick={() => deleteProduct(product?._id)}
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
        </div >
    );
};

export default ProductTable;
