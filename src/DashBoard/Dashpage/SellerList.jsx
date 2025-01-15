import React, { useState, useEffect } from 'react';

const SellerTable = () => {
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Mock seller data
    const mockSellers = [
        {
            _id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            storeName: 'John\'s Electronics',
            phoneNumber: '123-456-7890',
            isVerified: false,
        },
        {
            _id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            storeName: 'Jane\'s Home Goods',
            phoneNumber: '987-654-3210',
            isVerified: true,
        },
        {
            _id: '3',
            name: 'Alice Green',
            email: 'alice@example.com',
            storeName: 'Alice\'s Books',
            phoneNumber: '555-555-5555',
            isVerified: false,
        },
    ];

    // Simulate fetching sellers with a delay
    const fetchSellers = async () => {
        try {
            setLoading(true);
            // Simulate network delay
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setSellers(mockSellers);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch sellers:', error);
        }
    };

    // Approve seller
    const approveSeller = async (id) => {
        try {
            // Simulate approval process (mark as verified)
            await new Promise((resolve) => setTimeout(resolve, 500));
            setSellers(sellers.map(seller =>
                seller._id === id ? { ...seller, isVerified: true } : seller
            ));
        } catch (error) {
            console.error('Failed to approve seller:', error);
        }
    };

    // Delete seller
    const deleteSeller = async (id) => {
        try {
            // Simulate delete process
            setSellers(sellers.filter(seller => seller._id !== id));
        } catch (error) {
            console.error('Failed to delete seller:', error);
        }
    };

    // Edit seller
    const editSeller = async (id) => {
        // Logic to edit seller can be added here (like opening a form, etc.)
        console.log('Editing seller with ID:', id);
    };

    useEffect(() => {
        fetchSellers();
    }, []);

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
                        {sellers.map((seller) => (
                            <tr key={seller._id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">{seller.name}</td>

                                <td className="px-4 py-2 border">{seller.storeName}</td>
                                <td className="px-4 py-2 border">{seller.phoneNumber}</td>
                                <td className="px-4 py-2 border">
                                    {seller.isVerified ? (
                                        <span className="text-green-500">Verified</span>
                                    ) : (
                                        <span className="text-red-500">Not Verified</span>
                                    )}
                                </td>
                                <td className="px-4 py-2 border space-x-2">
                                    {seller.isVerified ? (
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
