import React, { useState, useEffect } from 'react';

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Mock products data
    const mockProducts = [
        {
            _id: '1',
            CategoryName: 'Electronics',
            ItemName: 'Smartphone',
            Price: '$699',
            StockStatus: 'In Stock',
        },
        {
            _id: '2',
            CategoryName: 'Home Appliances',
            ItemName: 'Air Conditioner',
            Price: '$899',
            StockStatus: 'Out of Stock',
        },
        {
            _id: '3',
            CategoryName: 'Books',
            ItemName: 'JavaScript Mastery',
            Price: '$29',
            StockStatus: 'In Stock',
        },
    ];

    // Simulate fetch products with a delay
    const fetchProducts = async () => {
        try {
            setLoading(true);
            // Simulate network delay
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setProducts(mockProducts);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    // Delete a product
    const deleteProduct = async (id) => {
        try {
            // Simulate API call for delete
            await new Promise((resolve) => setTimeout(resolve, 500));
            setProducts(products.filter((product) => product._id !== id));
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Placeholder functions for edit and view
    const editProduct = (id) => {
        console.log(`Edit product with ID: ${id}`);
    };

    const viewProduct = (id) => {
        console.log(`View product with ID: ${id}`);
    };

    return (
        <div className="p-4">
            <div className='flex border-b-2 pb-2 justify-between items-center'>
                <div>
                    <h1 className='font font-semibold text-slate-500   text-2xl'>Products List</h1>
                </div>
                <button
                    onClick={() => console.log('Add Product')}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                >
                    Add Product
                </button>
            </div>

            <div className="mt-4 overflow-x-auto">

                <table className="min-w-full border border-gray-200 bg-white shadow-md rounded">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left px-4 py-2 border">Category Name</th>
                            <th className="text-left px-4 py-2 border">Item Name</th>
                            <th className="text-left px-4 py-2 border">Price</th>
                            <th className="text-left px-4 py-2 border">Stock Status</th>
                            <th className="text-left px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">{product.CategoryName}</td>
                                <td className="px-4 py-2 border">{product.ItemName}</td>
                                <td className="px-4 py-2 border">{product.Price}</td>
                                <td className="px-4 py-2 border">{product.StockStatus}</td>
                                <td className="px-4 py-2 border space-x-2">
                                    <button
                                        onClick={() => viewProduct(product._id)}
                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => editProduct(product._id)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteProduct(product._id)}
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

export default ProductTable;
