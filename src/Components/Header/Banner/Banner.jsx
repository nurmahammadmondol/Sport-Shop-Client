import React from 'react';
import Typewriter from 'typewriter-effect';
import BannerImage3 from '../../../assets/Photo/Banner3.jpg';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div
      className="h-full md:h-[500px] w-full "
      style={{
        backgroundImage: `url(${BannerImage3})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // opacity: 0.7,
      }}
    >
      <div className="text-white  z-50 flex flex-col justify-center items-center h-full w-11/12 md:w-9/12 lg:w-8/12 mx-auto space-y-3 md:space-y-5 py-5">
        <h4
          data-aos="fade-down"
          className="text-3xl md:text-6xl font-bold text-[#4478a7]"
        >
          Sports Accessories
        </h4>
        <p className="md:hidden text-center text-gray-400 text-sm">
          <Typewriter
            options={{
              strings: [
                'Step into a world of premium sports accessories with ProPlayAccessories. Whether you’re training, competing, or staying fit, we provide gear that enhances performance and ensures comfort. From protective equipment to stylish active wear, explore a collection crafted to help you achieve your goals. ',
              ],

              autoStart: true,
              loop: true,
            }}
          />
        </p>
        <p className="hidden md:flex text-center text-gray-400 text-sm ">
          Step into a world of premium sports accessories with ProPlay
          Accessories. Whether you’re training, competing, or staying fit, we
          provide gear that enhances performance and ensures comfort. From
          protective equipment to stylish activewear, explore a collection
          crafted to help you achieve your goals. Empower your game with ProPlay
          today!
        </p>
        <Link to="/Products">
          <button
            data-aos="fade-up"
            data-aos-duration="3000"
            className="btn bg-[#4478a7] text-white border-none rounded-none px-5"
          >
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
