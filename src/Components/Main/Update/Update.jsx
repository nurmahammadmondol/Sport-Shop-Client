import React, { useState } from 'react';
import BG from '../../../assets/Photo/bg.png';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const Update = () => {
  const loadRealIdData = useLoaderData();
  const [updateData, setUpdateData] = useState(loadRealIdData);

  // console.log(loadRealIdData);
  const navigate = useNavigate();

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
  } = updateData;

  const handleUpdateForm = e => {
    e.preventDefault();

    const form = e.target;

    const ItemName = form.ItemName.value;
    const Price = form.Price.value;
    const Customization = form.Customization.value;
    const ProcessingTime = form.ProcessingTime.value;
    const StockStatus = form.StockStatus.value;
    const Rating = form.Rating.value;
    const Description = form.Description.value;
    const Photo = form.photo.value;

    const Real_Data_Update = {
      CategoryName,
      ItemName,
      Price,
      Customization,
      ProcessingTime,
      StockStatus,
      Rating,
      Description,
      Photo,
    };
    console.log(_id);

    fetch(
      `http://localhost:1000/All_Accessories/${_id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Real_Data_Update),
      }
    )
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your product update was successful.',
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/MyEquipment');
        }
      });
  };

  const handelBackButton = () => {
    navigate(-1);
  };

  return (
    <div
      className="py-7"
      style={{
        backgroundImage: `url(${BG})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div>
        <Helmet>
          <title>ProPlay Accessories || Update</title>
        </Helmet>
      </div>
      <div>
        <h4
          onClick={handelBackButton}
          className="flex items-center ml-5 gap-1 rancho-regular "
        >
          <i class="fa-solid fa-arrow-left"></i>Back
        </h4>
      </div>
      <div className="card bg-base-100  md:w-10/12 lg:w-8/12 mx-auto shrink-0 md:shadow-2xl">
        <div className="text-center w-11/12 md:w-9/12 lg:w-8/12 mx-auto mt-5 space-y-3">
          <h4 className="text-2xl md:text-3xl font-bold">
            Update Sports Accessories
          </h4>
          <p className="text-xs  text-gray-400">
            Modify your sports gear details with ease. Update product
            information, pricing, and customization options to keep your
            collection up-to-date and ready for performance.
          </p>
        </div>
        <form
          onSubmit={handleUpdateForm}
          className="card-body flex flex-col gap-3"
        >
          <div className="md:flex gap-5 clear-start w-full mb-1 ">
            <label className="form-control w-full md:w-1/2 mb-2 md:mb-0">
              <div className="label">
                <span className="label-text">Item Name</span>
              </div>
              <input
                type="text"
                // placeholder="Enter item name"
                defaultValue={ItemName}
                className="input  w-full  bg-slate-50"
                name="ItemName"
              />
            </label>

            <label className="form-control w-full md:w-1/2 m">
              <div className="label">
                <span className="label-text">Category Name</span>
              </div>

              <input
                type="text"
                value={CategoryName}
                className="input  w-full  bg-slate-50"
                name="CategoryName"
              />
              {/* <select
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
              </select> */}
            </label>
          </div>

          <div className="md:flex gap-5 clear-start w-full mb-1 ">
            <label className="form-control w-full md:w-1/2 mb-2 md:mb-0">
              <div className="label">
                <span className="label-text">Price</span>
              </div>
              <input
                type="number"
                // placeholder="Enter price"
                defaultValue={Price}
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
                // placeholder="Enter customization"
                defaultValue={Customization}
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
                // placeholder="Enter delivery time"
                defaultValue={ProcessingTime}
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
                // placeholder="Enter stock status"
                defaultValue={StockStatus}
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
                // placeholder="Rating"
                defaultValue={Rating}
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
                // placeholder="Description"
                defaultValue={Description}
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
                // placeholder="Enter photo URL"
                defaultValue={Photo}
                className="input  w-full bg-slate-50"
                name="photo"
              />
            </label>
          </div>

          <div className="form-control mt-6">
            <button className="btn bg-[#4478a7] text-white">
              Update Accessories
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
