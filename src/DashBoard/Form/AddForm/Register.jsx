import React from 'react';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import axoissecure from '../../../share/Axoisecure';

const Register = () => {
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
                }
            } catch (error) {
                toast.error("An error occurred while adding the product. Please try again.");
                console.error("Error adding product:", error);
            }
        }
    });

    // Handle file input for the profile photo
    const handleFileChange = event => {
        formik.setFieldValue('profile', event.currentTarget.files[0]);
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
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    className="mt-2 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                />
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

            {/* Profile Photo */}
            <div className="mb-4">
                <label htmlFor="profile" className="block text-sm font-medium text-gray-600">Profile Photo</label>
                <input
                    id="profile"
                    name="profile"
                    type="file"
                    onChange={handleFileChange}
                    className="mt-2 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Submit Button */}
            <div className="flex justify-between">
                {/* Reset Button */}
                <button
                    type="reset"
                    onClick={() => formik.resetForm()}
                    className="w-32 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                    Cancel
                </button>

                {/* Submit Button */}
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
