import React, { useState } from 'react';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import axoissecure from '../../../share/Axoisecure';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Importing eye icons
import { useNavigate, useParams } from 'react-router-dom';

const Register = () => {
    const imgbbAPIKey = 'e24eb36f6b11de0c47cce166247db49b'; // Replace with your ImgBB API Key
    const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
    const navigate = useNavigate()
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
        }
        return null; // Return null if the upload fails
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            role: 'SELLER',
            storeName: '',
            phoneNumber: '',
            address: '',
            profile: '',
        },
        onSubmit: async (values) => {
            if (values.profile) {
                const imageUrl = await uploadImage(values.profile);
                if (imageUrl) {
                    values.profile = imageUrl;
                } else {
                    toast.error("Image upload failed. Please try again.");
                    return; // Prevent submission if image upload fails
                }
            }

            try {
                const response = await axoissecure.post("/register/add", {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    storeName: values.storeName,
                    phoneNumber: values.phoneNumber,
                    address: values.address,
                    profile: values.profile,
                    role: 'SELLER',
                    isOwnerVerified: false
                });

                if (response.status === 201) {
                    toast.success("Register User successfully!");
                    handleReset();
                    navigate('/dashlogin')
                }
            } catch (error) {
                toast.error("An error occurred while adding the product. Please try again.");
                console.error("Error adding product:", error);
            }
        }
    });

    const handleFileChange = event => {
        formik.setFieldValue('profile', event.currentTarget.files[0]);
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(prevState => !prevState);
    };

    return (
        <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

            {/* Name Field */}
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    className="mt-2 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                />
            </div>

            {/* Email Field */}
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    className="mt-2 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                />
            </div>

            {/* Password Field */}
            <div className="mb-4 relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                <input
                    id="password"
                    name="password"
                    type={passwordVisible ? "text" : "password"} // Toggle between text and password
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    className="mt-2 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                />
                <span
                    onClick={togglePasswordVisibility}
                    className="absolute right-5  bottom-1 transform -translate-y-1/2 cursor-pointer"
                >
                    {passwordVisible ? <FiEyeOff size={24} /> : <FiEye size={24} />}
                </span>
            </div>

            {/* Store Name */}
            <div className="mb-4">
                <label htmlFor="storeName" className="block text-sm font-medium text-gray-600">Store Name</label>
                <input
                    id="storeName"
                    name="storeName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.storeName}
                    className="mt-2 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your store name (if applicable)"
                />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-600">Phone Number</label>
                <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.phoneNumber}
                    className="mt-2 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                />
            </div>

            {/* Address */}
            <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-600">Address</label>
                <textarea
                    id="address"
                    name="address"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                    className="mt-2 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your address"
                />
            </div>

            {/* Submit Button */}
            <div className="flex justify-between">
                <button
                    type="reset"
                    onClick={() => formik.resetForm()}
                    className="w-32 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                    Clear
                </button>

                <button
                    type="submit"
                    className="w-32 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Register
                </button>
            </div>
        </form>
    );
};

export default Register;
