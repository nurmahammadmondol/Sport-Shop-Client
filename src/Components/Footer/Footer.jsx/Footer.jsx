import React from 'react';
import Logo from '../../../assets/Photo/logo (2).png';

const Footer = () => {
  return (
    <div>
      <footer className="footer bg-neutral text-neutral-content p-10">
        <nav className="flex flex-col justify-center items-center">
          <img className="w-full md:w-36 md:h-20" src={Logo} alt="" />
          <h6 className="text-xl md:text-3xl text-white font-bold rancho-regular">
            ProPlay Accessories Store
          </h6>
        </nav>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      <div className="bg-neutral text-neutral-content pb-2">
        <h4 className="text-sm text-center rancho-regular">
          © Created by Nur Mahammad Mondol Robiul, Study web development. All
          right reserved @ProPlay Accessories 2024
        </h4>
      </div>
    </div>
  );
};

export default Footer;
