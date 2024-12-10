import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContent } from '../../Provider/AuthProvider';
import logoImage from '../../../assets/Photo/logo (2).png';

const Navbar = () => {
  const { User, LogOutButton } = useContext(AuthContent);

  const Links = (
    <div className="flex items-center gap-2 md:gap-4 lg:gap-7 ">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/Products">Products</NavLink>
      {User && (
        <div className="flex gap-4">
          <NavLink to="/AddEquipment">Add Equipment</NavLink>
          <NavLink to="/MyEquipment">My Equipment List</NavLink>
        </div>
      )}
      <NavLink to="/AboutUS">About Us</NavLink>
      <NavLink to="/ContactUS">Contact Us</NavLink>
    </div>
  );

  return (
    <nav className="navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3  p-2 shadow text-black"
          >
            {Links}
          </ul>
        </div>
        <div className="flex gap-1 items-center">
          <img className="w-20 h-14 hidden md:flex" src={logoImage} alt="" />
          <a className=" text-xl md:text-3xl text-white font-bold rancho-regular">
            ProPlay Accessories
          </a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-white">{Links}</ul>
      </div>

      <div className="navbar-end ">
        {User ? (
          <div className="flex items-center gap-2">
            <div className="relative group h-11 w-11">
              <img
                className="h-full w-full rounded-full border"
                src={User?.photoURL}
                alt="User profile photo"
              />

              <div className="absolute left-full -translate-x-full  bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {User?.displayName || 'User'}
              </div>
            </div>
            <button
              onClick={LogOutButton}
              className="btn btn-outline text-white"
            >
              Log Out
            </button>
          </div>
        ) : (
          <Link to="/LogIn">
            <button className="btn btn-outline text-white">Log In</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
