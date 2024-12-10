import React, { useContext, useState } from 'react';
import BG from '../../../assets/Photo/bg.png';
import { AuthContent } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const AddEquipment = () => {
  const { User } = useContext(AuthContent);

  const UserName = User?.displayName;
  const UserEmail = User?.email;
  // console.log(UserName, UserEmail);

  const [CategoryName, setSelectedSimpsonCategoryName] = useState('');
  // console.log(selectedSimpsonItemName, selectedSimpsonCategoryName);
  const handleSimpsonChangeCategoryName = e => {
    setSelectedSimpsonCategoryName(e.target.value);
  };

  const handleFromSubmit = e => {
    e.preventDefault();

    const form = e.target;
    // const UserName = form.UserName.value;
    // const UserEmail = form.UserEmail.value;
    const ItemName = form.ItemName.value;
    const Price = form.Price.value;
    const Customization = form.Customization.value;
    const ProcessingTime = form.ProcessingTime.value;
    const StockStatus = form.StockStatus.value;
    const Rating = form.Rating.value;
    const Description = form.Description.value;
    const Photo = form.photo.value;

    const All_Data = {
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
    };

    fetch(
      'https://sports-equipment-store-server-site.vercel.app/All_Accessories',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(All_Data),
      }
    )
      .then(res => res.json())
      .then(data => {
        // console.log(data);

        if (data.insertedId) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your product was successfully added.',
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
        }
      });
  };

  return (
    <div
      className="hero  min-h-screen md:py-10"
      style={{
        backgroundImage: `url(${BG})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div>
        <Helmet>
          <title>ProPlay Accessories || Add Equipment</title>
        </Helmet>
      </div>
      <div className="card bg-base-100  md:w-10/12 lg:w-8/12 mx-auto shrink-0 md:shadow-2xl">
        <div className="text-center w-11/12 md:w-9/12 lg:w-8/12 mx-auto mt-5 space-y-3">
          <h4 className="text-2xl md:text-3xl font-bold">
            Add New Sports Accessories
          </h4>
          <p className="text-xs  text-gray-400">
            Add premium sports gear to your collection. Designed for
            performance, durability, and style—perfect for athletes and sports
            enthusiasts!"
          </p>
        </div>
        <form
          onSubmit={handleFromSubmit}
          className="card-body flex flex-col gap-3"
        >
          <div className="md:flex gap-5 clear-start w-full mb-1 ">
            <label className="form-control w-full md:w-1/2 mb-2 md:mb-0">
              <div className="label">
                <span className="label-text">Item Name</span>
              </div>
              <input
                type="text"
                placeholder="Enter item name"
                className="input  w-full  bg-slate-50"
                name="ItemName"
              />
            </label>

            <label className="form-control w-full md:w-1/2 m">
              <div className="label">
                <span className="label-text">Category Name</span>
              </div>

              <select
                className="select w-full bg-slate-50 "
                value={CategoryName}
                onChange={handleSimpsonChangeCategoryName}
              >
                <option value="" disabled>
                  Select category name
                </option>
                <option value="Football related equipment">
                  Football related equipment
                </option>
                <option value="Basketball related equipment">
                  Basketball related equipment
                </option>
                <option value="Cricket related equipment">
                  Cricket related equipment
                </option>
                <option value="Badminton related equipment">
                  Badminton related equipment
                </option>
                <option value="Hockey related equipment">
                  Hockey related equipment
                </option>
                <option value="Fitness & Gym Equipment">
                  Fitness & Gym Equipment
                </option>
              </select>
            </label>
          </div>

          <div className="md:flex gap-5 clear-start w-full mb-1 ">
            <label className="form-control w-full md:w-1/2 mb-2 md:mb-0">
              <div className="label">
                <span className="label-text">Price</span>
              </div>
              <input
                type="text"
                placeholder="Enter price"
                className="input  w-full  bg-slate-50"
                name="Price"
              />
            </label>

            <label className="form-control w-full md:w-1/2">
              <div className="label">
                <span className="label-text">Customization</span>
              </div>
              <input
                type="text"
                placeholder="Enter customization"
                className="input  w-full bg-slate-50"
                name="Customization"
              />
            </label>
          </div>

          <div className="md:flex gap-5 clear-start w-full mb-1 ">
            <label className="form-control w-full md:w-1/2 mb-2 md:mb-0">
              <div className="label">
                <span className="label-text">Processing Time</span>
              </div>
              <input
                type="text"
                placeholder="Enter delivery time"
                className="input  w-full  bg-slate-50"
                name="ProcessingTime"
              />
            </label>

            <label className="form-control w-full md:w-1/2">
              <div className="label">
                <span className="label-text">Stock Status</span>
              </div>
              <input
                type="text"
                placeholder="Enter stock status"
                // defaultValue={All_Accessories.length}
                className="input  w-full bg-slate-50"
                name="StockStatus"
              />
            </label>
          </div>

          <div className="md:flex gap-5 clear-start w-full mb-1 ">
            <label className="form-control w-full md:w-1/2 mb-2 md:mb-0">
              <div className="label">
                <span className="label-text">Rating</span>
              </div>
              <input
                type="text"
                placeholder="Rating"
                className="input  w-full  bg-slate-50"
                name="Rating"
              />
            </label>

            <label className="form-control w-full md:w-1/2">
              <div className="label">
                <span className="label-text">Description</span>
              </div>
              <input
                type="text"
                placeholder="Description"
                className="input  w-full bg-slate-50"
                name="Description"
              />
            </label>
          </div>

          <div className="md:flex gap-5 clear-start w-full mb-1 ">
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Photo</span>
              </div>
              <input
                type="text"
                placeholder="Enter photo URL"
                className="input  w-full bg-slate-50"
                name="photo"
              />
            </label>
          </div>

          <div className="form-control mt-6">
            <button className="btn bg-[#4478a7] text-white">
              Add Accessories
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEquipment;
