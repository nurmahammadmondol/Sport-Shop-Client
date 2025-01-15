import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import nagad from "../assets/Photo/nagad.png";
import bkash from "../assets/Photo/bkash.png";
import dach from "../assets/Photo/dach.jpg";
import { AuthContent } from "../Components/Provider/AuthProvider";
import axoissecure from "./Axoisecure";
const CardPaymentModal = ({ isOpen, onClose, value }) => {
  const { setOdered } = useContext(AuthContent);
  const { User } = useContext(AuthContent);
  console.log(value);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Payment Data: ", data);

    try {
      // Define the API endpoint
      const apiEndpoint = '/api/payment';

      // Create the data object to send in the POST request
      const paymentData = {
        email: User?.email, // Assuming 'email' is part of the form data
        productIds: value._id, // Assuming 'productId' is part of the form data
        totalAmount: value.Price, // Assuming 'price' is part of the form data
      };

      // Send POST request to the server
      const response = await axoissecure.post('/products/order', paymentData);

      if (response.status === 201) {
        // Show success message from SweetAlert
        Swal.fire({
          title: "Payment Successful!",
          text: "Your payment was processed successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          // Navigate to the orders page
          navigate(`/myorder`);
          setOdered(value?._id);  // Update with order ID or value as needed
          onClose(); // Close the modal or form
        });
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      console.error('Error during payment:', error);

      // Show error message from SweetAlert
      Swal.fire({
        title: "Payment Failed",
        text: "There was an issue processing your payment. Please try again.",
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-600"
        >
          &times;
        </button>

        {/* Modal Header */}
        <h2 className="text-xl font-semibold mb-4">Card Payment</h2>

        {/* Payment Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Card Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              maxLength="16"
              {...register("cardNumber", {
                required: "Card Number is required",
                pattern: {
                  value: /^[0-9]{16}$/,
                  message: "Invalid card number",
                },
              })}
              className={`w-full border ${errors.cardNumber ? "border-red-500" : "border-gray-300"
                } rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 ${errors.cardNumber
                  ? "focus:ring-red-500"
                  : "focus:ring-indigo-500"
                }`}
              placeholder="1234 5678 9012 3456"
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.cardNumber.message}
              </p>
            )}
          </div>

          {/* Expiry Date and CVC */}
          <div className="mb-4 flex space-x-4">
            {/* Expiry Date */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="month"
                {...register("expiryDate", {
                  required: "Expiry Date is required",
                })}
                placeholder="MM/YYYY"
                className={`w-full border ${errors.expiryDate ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 ${errors.expiryDate
                    ? "focus:ring-red-500"
                    : "focus:ring-indigo-500"
                  }`}
              />
              {errors.expiryDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.expiryDate.message}
                </p>
              )}
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                type="text"
                defaultValue={value?.Price}
                disabled
                placeholder="123"
<<<<<<< HEAD
                className={`w-full text-green-400 border ${errors.cvc ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 ${errors.cvc ? "focus:ring-red-500" : "focus:ring-indigo-500"
                  }`}
=======
                className={`w-full text-gray-400 border ${
                  errors.cvc ? "border-red-500" : "border-gray-300"
                } rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 ${
                  errors.cvc ? "focus:ring-red-500" : "focus:ring-indigo-500"
                }`}
>>>>>>> 759a4651c328c7f09f49c01c569575f25290891f
              />
            </div>

            {/* CVC */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                CVC
              </label>
              <input
                type="text"
                maxLength="3"
                {...register("cvc", {
                  required: "CVC is required",
                  pattern: {
                    value: /^[0-9]{3}$/,
                    message: "Invalid CVC",
                  },
                })}
                placeholder="123"
                className={`w-full border ${errors.cvc ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 ${errors.cvc ? "focus:ring-red-500" : "focus:ring-indigo-500"
                  }`}
              />
              {errors.cvc && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.cvc.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded-lg mt-4 hover:bg-indigo-700"
          >
            Pay Now
          </button>
        </form>

        {/* Payment Options (bKash, Nagad Icons) */}
        <div className="flex justify-center gap-4 mt-4">
          <img
            src={bkash} // Replace with actual bKash icon path
            alt="bKash"
            className="w-12 h-12 cursor-pointer"
          />
          <img
            src={nagad} // Replace with actual Nagad icon path
            alt="Nagad"
            className="w-12 h-12 cursor-pointer"
          />{" "}
          <img
            src={dach} // Replace with actual Nagad icon path
            alt="Nagad"
            className="w-12 h-12 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default CardPaymentModal;
