import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaUser, FaHome, FaSignOutAlt, FaClipboardList, FaBoxes } from "react-icons/fa";
import logo from '../assets/Photo/logo (2).png'
const DashSidebar = () => {
    const menuItems = [
        { label: "Overview", path: "/dashboard/overview", icon: <FaHome /> },
        { label: "Product Management", path: "/dashboard/productlist", icon: <FaBoxes /> },
        // { label: "Seller Request", path: "/dashboard/seller", icon: <FaClipboardList /> },
    ];

    const navigate = useNavigate()
    const handleLogout = () => {
        navigate('/dashlogin')
        // Implement logout logic here
    };

    return (
        <div className="bg-gray-800 fixed text-white w-72 min-h-screen flex flex-col justify-between p-4">
            {/* Top Section - Logo */}
            <div>

                <Link to={'/'}> <div className="flex items-center mb-6">
                    <img
                        src={logo}// Replace with your logo URL
                        alt="Logo"
                        className="w-10 h-10 rounded-full mr-2"
                    />
                    <h2 className="text-lg font-bold">ProPlay Accessories</h2>
                </div></Link>

                <ul>
                    {menuItems.map((item) => (
                        <li key={item.path} className="mb-2">
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-2 p-2 rounded ${isActive ? "bg-gray-600" : "hover:bg-gray-700"
                                    }`
                                }
                            >
                                {item.icon}
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Bottom Section - Logout */}
            <div>
                {/* Shop Information */}
                <div className="flex items-center mb-4">

                </div>
                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 p-2 rounded w-full"
                >
                    <FaSignOutAlt />
                    Logout
                </button>
            </div>

        </div>
    );
};

export default DashSidebar;
