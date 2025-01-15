import React, { useContext, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import CardPaymentModal from '../../../share/CardPaymentModal';
import { AuthContent } from '../../Provider/AuthProvider';
import axoissecure from '../../../share/Axoisecure';
import { useQuery } from '@tanstack/react-query';
import BG from '../../../assets/Photo/bg.png';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { User } = useContext(AuthContent);
  const [value, setValue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetching product details
  const { data: details, refetch, isLoading, error } = useQuery({
    queryKey: ["singlepro", id],
    queryFn: async () => {
      const res = await axoissecure.get(`/products/${id}`);
      return res?.data?.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching details!</div>;
  }

  const handelBackButton = () => {
    navigate(-1);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setValue(details);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${BG})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <Helmet>
        <title>ProPlay Accessories || Details</title>
      </Helmet>

      <CardPaymentModal isOpen={isModalOpen} onClose={closeModal} value={value} />

      <h4 onClick={handelBackButton} className="flex items-center gap-1 m-3 rancho-regular cursor-pointer">
        <i className="fa-solid fa-arrow-left"></i> Back
      </h4>

      <div className="w-11/12 md:w-9/12 lg:w-8/12 mx-auto min-h-screen py-10">
        <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-5 rancho-regular">Details</h4>

        <div className="border h-full md:h-[500px] md:flex gap-5 bg-base-100 shadow-xl">
          <div className="w-full md:w-1/2 h-[350px] md:h-full">
            <img className="h-full w-full object-cover" src={details?.Photo || 'placeholder.jpg'} alt="Product" />
          </div>

          <div className="w-full md:w-1/2 p-3 md:p-5 space-y-4 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">{details?.ItemName}</h2>

            <small className="text-gray-500">
              <i className="fa-regular fa-user mr-1"></i> User Name: {details?.UserName}
            </small>
            <small className="text-gray-500">
              <i className="fa-regular fa-envelope mr-1"></i> User Email: {details?.UserEmail}
            </small>

            <div className="flex gap-5 md:gap-8 text-gray-500">
              <small>
                <i className="fa-solid fa-money-check-dollar mr-1"></i> Price: ${details?.Price}
              </small>
              <small>
                <i className="fa-brands fa-shopify mr-1"></i> Stock: {details?.StockStatus}
              </small>
            </div>

            <div className="flex gap-5 md:gap-8 text-gray-500">
              <small>
                <i className="fa-regular fa-star mr-1"></i> Rating: {details?.Rating}
              </small>
              <small>
                <i className="fa-regular fa-clock mr-1"></i> Delivery Time: {details?.ProcessingTime}
              </small>
            </div>

            <div className="flex gap-5 md:gap-8 text-gray-500">
              <small>
                <i className="fa-brands fa-intercom mr-1"></i> Customization: {details?.Customization || "No"}
              </small>
              <small>
                <i className="fa-solid fa-message mr-1"></i> Description: {details?.Description || "No description provided"}
              </small>
            </div>

            <div className="pt-2">
              {User ? (
                <button
                  onClick={openModal}
                  className="px-6 py-1 bg-blue-600 text-white font-semibold text-lg rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Pay
                </button>
              ) : (
                <Link to="/Login">
                  <button className="btn btn-primary w-full">Pay</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
