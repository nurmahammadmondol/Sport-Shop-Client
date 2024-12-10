import React from 'react';

import FootballImg from '../../../assets/Photo/Football.jpg';
import CricketImg from '../../../assets/Photo/Cricket.webp';
import BasketballImg from '../../../assets/Photo/Bacsketball.jpg';
import HockeyImg from '../../../assets/Photo/Hockey.jpg';
import BadmintonImg from '../../../assets/Photo/Badminton.jpg';
import FitnessGymImg from '../../../assets/Photo/Fitness & Gym.webp';

const Collection_H = () => {
  return (
    <div className="my-20 ">
      <h4 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-10 rancho-regular">
        Hanpicked Collection
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-10 space-y-7 md:space-y-0">
        <div
          data-aos="zoom-in-up"
          className="h-[200px] md:h-[250px] lg:h-[300px]  text-white rounded-lg "
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${FootballImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.7,
          }}
        >
          <div className="h-full flex flex-col items-end justify-end p-5">
            <h4 className="font-semibold">Football Collections</h4>
            <small className="text-xs">Explore All</small>
          </div>
        </div>
        <div
          data-aos="zoom-in-up"
          className="h-[200px] md:h-[250px] lg:h-[300px]  text-white rounded-lg "
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${CricketImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.7,
          }}
        >
          <div className="h-full flex flex-col items-end justify-end p-5">
            <h4 className="font-semibold">Cricket Collections</h4>
            <small className="text-xs">Explore All</small>
          </div>
        </div>
        <div
          data-aos="zoom-in-up"
          className="h-[200px] md:h-[250px] lg:h-[300px]  text-white rounded-lg "
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${BadmintonImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.7,
          }}
        >
          <div className="h-full flex flex-col items-end justify-end p-5">
            <h4 className="font-semibold">Badminton Collections</h4>
            <small className="text-xs">Explore All</small>
          </div>
        </div>
        <div
          data-aos="zoom-in-up"
          className="h-[200px] md:h-[250px] lg:h-[300px]  text-white rounded-lg "
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${BasketballImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.7,
          }}
        >
          <div className="h-full flex flex-col items-end justify-end p-5">
            <h4 className="font-semibold">Basketball Collections</h4>
            <small className="text-xs">Explore All</small>
          </div>
        </div>
        <div
          data-aos="zoom-in-up"
          className="h-[200px] md:h-[250px] lg:h-[300px]  text-white rounded-lg "
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${HockeyImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.7,
          }}
        >
          <div className="h-full flex flex-col items-end justify-end p-5">
            <h4 className="font-semibold">Hockey Collections</h4>
            <small className="text-xs">Explore All</small>
          </div>
        </div>
        <div
          data-aos="zoom-in-up"
          className="h-[200px] md:h-[250px] lg:h-[300px]  text-white rounded-lg "
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${FitnessGymImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.7,
          }}
        >
          <div className="h-full flex flex-col items-end justify-end p-5">
            <h4 className="font-semibold">Fitness & Gym Collections</h4>
            <small className="text-xs">Explore All</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection_H;
