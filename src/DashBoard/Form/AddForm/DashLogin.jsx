import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { AuthContent } from '../../../Components/Provider/AuthProvider';
import { Link } from 'react-router-dom';

const DashLogin = () => {
    const { handleLogin } = useContext(AuthContent);

    // State for password visibility
    const [showPassword, setShowPassword] = useState(false);

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Initialize Formik with initial values and submit handler
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: values => {
            handleLogin(values.email);
        },
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={formik.handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

                {/* Email Field */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                        Email Address
                    </label>
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
                <div className="mb-6 relative">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        className="mt-2 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                    />
                    {/* Show/Hide Password Icon */}
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-10 text-gray-500 focus:outline-none"
                    >
                        {showPassword ? '🙈' : '👁️'}
                    </button>
                </div>

                <Link className="underline text-red-400" to={'/register'}>
                    No Account? Register
                </Link>

                {/* Buttons */}
                <div className="flex justify-between pt-3 items-center">
                    {/* Reset Button */}
                    <button
                        type="reset"
                        onClick={() => formik.resetForm()}
                        className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                        Clear
                    </button>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DashLogin;
