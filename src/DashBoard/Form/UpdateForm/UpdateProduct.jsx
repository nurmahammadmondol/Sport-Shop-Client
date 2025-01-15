import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { Link, useParams } from 'react-router-dom';
import axoissecure from '../../../share/Axoisecure';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

const UpdateProduct = () => {


    const { id } = useParams()
    const { data: item = [], refetch } = useQuery({
        queryKey: ["pro"],
        queryFn: async () => {
            try {
                const res = await axoissecure.get(`/products/${id}`);
                return res?.data?.data || [];
            } catch (error) {
                console.error("Error fetching products:", error);
                throw error;
            }
        },
    });
    const imgbbAPIKey = 'e24eb36f6b11de0c47cce166247db49b'; // Replace with your ImgBB API Key

    const handleReset = () => {
        formik.resetForm();
    };

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`, {
                method: "POST",
                body: formData,
            });
            const result = await response.json();
            if (result.success) {
                return result.data.url; // Returns the image URL
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            // toast.error("Failed to upload the image. Please try again.");
        }
        return null; // Return null if the upload fails
    };

    // Initialize Formik with initial values and submit function
    const formik = useFormik({
        initialValues: {
            CategoryName: '',
            ItemName: '',
            Price: '',
            quntity: '',
            ProcessingTime: '',
            StockStatus: 'In Stock',
            Rating: 0,
            Description: '',
            Photo: '',
        },

        onSubmit: async (values) => {
            if (values.Photo) {
                const imageUrl = await uploadImage(values.Photo);
                if (imageUrl) {
                    values.Photo = imageUrl;
                } else {
                    // toast.error("Image upload failed. Please try again.");
                    return; // Prevent submission if image upload fails
                }
            }

            try {
                const response = await axoissecure.patch(`/products/${id}`, {
                    CategoryName: values.CategoryName,
                    ItemName: values.ItemName,
                    Price: values.Price,
                    quntity: values.quntity,
                    ProcessingTime: values.ProcessingTime,
                    StockStatus: values.StockStatus,
                    Rating: values.Rating,
                    Description: values.Description,
                    Photo: values.Photo,
                });

                if (response.status === 200) {
                    toast.success("Product Updated successfully!");

                }
            } catch (error) {
                toast.error("An error occurred while adding the product. Please try again.");
                console.error("Error adding product:", error);
            }
        },
    });


    useEffect(() => {
        if (item) {
            formik.setValues({
                CategoryName: item?.CategoryName || "",
                ItemName: item?.ItemName,
                Price: item?.Price,
                quntity: item?.quntity,
                ProcessingTime: item?.ProcessingTime,
                StockStatus: item?.StockStatus,
                featuredImg: item?.featuredImgUrl,
                Rating: item?.Rating,
                Photo: item?.Photo,
                Description: item?.Description,
            });
        }
    }, [item]);

    // Handle file change for image upload
    const handleFileChange = event => {
        formik.setFieldValue('Photo', event.currentTarget.files[0]);
    };

    return (

        <>
            <div className='flex border-b-2 pb-2 justify-between items-center'>
                <div>
                    <h1 className='font font-semibold text-slate-500   text-2xl'>Update Product </h1>
                </div>
                <Link to={'/dashboard/productlist'}>

                    <button

                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                    >
                        Back List
                    </button>
                </Link>

            </div>
            <form onSubmit={formik.handleSubmit} className="w-full mt-5 mx-auto bg-white p-6 rounded-lg shadow-lg">

                <div className='gap-4 grid grid-cols-2'>

                    {/* Category Name */}
                    <div className="mb-4">
                        <label htmlFor="CategoryName" className="block text-sm font-medium text-gray-600">Category Name</label>
                        <input
                            id="CategoryName"
                            name="CategoryName"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.CategoryName}
                            className="mt-2 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Category Name"
                        />
                    </div>

                    {/* Item Name */}
                    <div className="mb-4">
                        <label htmlFor="ItemName" className="block text-sm font-medium text-gray-600">Item Name</label>
                        <input
                            id="ItemName"
                            name="ItemName"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.ItemName}
                            className="mt-2 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Item Name"
                        />
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                        <label htmlFor="Price" className="block text-sm font-medium text-gray-600">Price</label>
                        <input
                            id="Price"
                            name="Price"
                            type="number"
                            onChange={formik.handleChange}
                            value={formik.values.Price}
                            className="mt-2 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Price"
                        />
                    </div>


                    <div className="mb-4">
                        <label htmlFor="Rating" className="block text-sm font-medium text-gray-600">Rating</label>
                        <input
                            id="Rating"
                            name="Rating"
                            type="number"
                            onChange={formik.handleChange}
                            value={formik.values.Rating}
                            className="mt-2 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Rating"
                        />
                    </div>

                    {/* Quantity */}
                    <div className="mb-4">
                        <label htmlFor="quntity" className="block text-sm font-medium text-gray-600">Quantity</label>
                        <input
                            id="quntity"
                            name="quntity"
                            type="number"
                            onChange={formik.handleChange}
                            value={formik.values.quntity}
                            className="mt-2 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Quantity"
                        />
                    </div>

                    {/* Processing Time */}
                    <div className="mb-4">
                        <label htmlFor="ProcessingTime" className="block text-sm font-medium text-gray-600">Processing Time</label>
                        <input
                            id="ProcessingTime"
                            name="ProcessingTime"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.ProcessingTime}
                            className="mt-2 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Processing Time"
                        />
                    </div>

                    {/* Stock Status */}
                    <div className="mb-4">
                        <label htmlFor="StockStatus" className="block text-sm font-medium text-gray-600">Stock Status</label>
                        <select
                            id="StockStatus"
                            name="StockStatus"
                            onChange={formik.handleChange}
                            value={formik.values.StockStatus}
                            className="mt-2 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="In Stock">In Stock</option>
                            <option value="Out of Stock">Out of Stock</option>
                        </select>
                    </div>

                    {/* Image Upload */}
                    <div className="mb-4">
                        <label htmlFor="Photo" className="block text-sm font-medium text-gray-600">Upload Image</label>
                        <input
                            id="Photo"
                            name="Photo"
                            type="file"
                            onChange={handleFileChange}
                            className="mt-2 w-full p-3 border rounded-md"
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label htmlFor="Description" className="block text-sm font-medium text-gray-600">Description</label>
                        <textarea
                            id="Description"
                            name="Description"
                            onChange={formik.handleChange}
                            value={formik.values.Description}
                            className="mt-2 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Description"
                        />
                    </div>


                </div>



                <div className='flex justify-between items-center'>


                    <div></div>

                    <div className='flex items-center gap-5'>
                        {/* Cancel Button */}
                        <button
                            type="button"
                            onClick={() => formik.resetForm()}
                            className="w-32 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                            Cancel
                        </button>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-32 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                            Update
                        </button>
                    </div>



                </div>




            </form >

        </>

    );
};

export default UpdateProduct;
