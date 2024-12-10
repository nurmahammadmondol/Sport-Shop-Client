import React, { useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import BG from '../../../assets/Photo/bg.png';
import { Helmet } from 'react-helmet';

const Details = () => {
  const loadRealIdDetails = useLoaderData();
  const [details, setDetails] = useState(loadRealIdDetails);

  const navigate = useNavigate();

  const handelBackButton = () => {
    navigate(-1);
  };

  const {
    _id,
    CategoryName,
    ItemName,
    Price,
    Customization,
    ProcessingTime,
    StockStatus,
    Rating,
    Description,
    Photo,
    UserName,
    UserEmail,
  } = details;

  return (
    <div
      className=""
      style={{
        backgroundImage: `url(${BG})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div>
        <Helmet>
          <title>ProPlay Accessories || Details</title>
        </Helmet>
      </div>
      <h4
        onClick={handelBackButton}
        className="flex items-center gap-1 m-3 rancho-regular "
      >
        <i class="fa-solid fa-arrow-left"></i>Back
      </h4>
      <div className=" w-11/12 md:w-9/12 lg:w-8/12 mx-auto min-h-screen flex flex-col justify-center  py-10 ">
        <h4 className=" text-2xl md:text-3xl lg:text-4xl font-bold mb-5 rancho-regular">
          Details
        </h4>

        <div className="border h-full md:h-[500px] md:flex  gap-5 bg-base-100 shadow-xl ">
          <div className="w-full  md:w-1/2 h-[350px]  md:h-full">
            <img className="h-full w-full" src={Photo} alt="Album" />
          </div>
          <div className="w-full md:w-1/2 p-3 md:p-5 space-y-4 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              {ItemName}
            </h2>
            <p className=" font-bold text-gray-400">
              Category : {CategoryName}
            </p>

            <small className="text-gray-500">
              <i class="fa-regular fa-user mr-1"></i>User Name : {UserName}
            </small>
            <small className="text-gray-500">
              <i class="fa-regular fa-envelope mr-1"></i>User Email :{' '}
              {UserEmail}
            </small>

            <div className="flex gap-5 md:gap-8 text-gray-500">
              <small>
                <i class="fa-solid fa-money-check-dollar mr-1"></i>Price :
                {Price}$
              </small>
              <small>
                <i class="fa-brands fa-shopify mr-1"></i>Stock : {StockStatus}
              </small>
            </div>
            <div className="flex gap-5 md:gap-8 text-gray-500">
              <small>
                <i class="fa-regular fa-star mr-1"></i>Rating : {Rating}
              </small>
              <small>
                <i class="fa-regular fa-clock mr-1"></i>Delivery Time :
                {ProcessingTime}
              </small>
            </div>

            <div className="flex gap-5 md:gap-8 text-gray-500">
              <small>
                <i class="fa-brands fa-intercom mr-1"></i>Customization :
                {Customization}
              </small>
              <small>
                <i class="fa-solid fa-message mr-1"></i>Description :
                {Description}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
