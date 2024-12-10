import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLoaderData } from 'react-router-dom';

const Products = () => {
  const loadAll_Accessory = useLoaderData();
  const [AllSportsEquipment, setAllSportsEquipment] =
    useState(loadAll_Accessory);

  const handleSortLowestPrice = () => {
    const sortedDataAcc = [...AllSportsEquipment].sort(
      (a, b) => a.Price - b.Price
    );
    setAllSportsEquipment(sortedDataAcc);
  };

  return (
    <div className="my-20 w-11/12 md:w-10/12  mx-auto">
      <div>
        <Helmet>
          <title>ProPlay Accessories || All Products</title>
        </Helmet>
      </div>
      <div className="flex  justify-between items-center mb-10">
        <h4 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold  rancho-regular">
          All Sports Equipment
        </h4>
        <div
          onClick={handleSortLowestPrice}
          className="flex items-center gap-4"
        >
          <button className="btn text-xs btn-outline text-[#4478a7]">
            $ Sort by price
          </button>
        </div>
      </div>

      <div>
        <div className="overflow-x-auto">
          <table className="table border">
            {/* head */}
            <thead className="">
              <tr className=" md:text-lg ">
                <th>Serial No</th>

                <th>Item Name</th>
                <th>Category Name</th>
                <th>Price</th>
                <th className="">Details(private)</th>
              </tr>
            </thead>
            <tbody>
              {AllSportsEquipment.map((singleProduct, index) => (
                <tr key={singleProduct._id} className="text-xs md:text-sm ">
                  <th>{index + 1}</th>
                  <td className="flex items-center gap-3 ">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={singleProduct.Photo}
                      alt="Item Image"
                    />
                    {singleProduct.ItemName}
                  </td>
                  <td className="text-xs">{singleProduct.CategoryName}</td>
                  <td>{singleProduct.Price}$</td>

                  <td>
                    <Link to={`/Details/${singleProduct._id}`}>
                      <button className="btn btn-xs rounded-none bg-[#4478a7] text-white w-full ">
                        View Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
