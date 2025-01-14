import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContent } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axoissecure from "../../../share/Axoisecure";

const Products = () => {
  const loadAll_Accessory = useLoaderData();
  const [AllSportsEquipment, setAllSportsEquipment] =
    useState(loadAll_Accessory);


  // const { data: item, refetch } = useQuery({
  //   queryKey: ["information"],
  //   queryFn: async () => {
  //     try {
  //       const res = await axoissecure.get(`/products`);
  //       console.log(res.data);
  //       return res.data.data;
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       throw error;
  //     }
  //   },
  // });

  const { User } = useContext(AuthContent);

  const handleSortLowestPrice = () => {
    const sortedDataAcc = [...AllSportsEquipment].sort(
      (a, b) => a.Price - b.Price
    );
    setAllSportsEquipment(sortedDataAcc);
  };

  const [query, setQuery] = useState("");
  const [customizationFilter, setCustomizationFilter] = useState("All");
  const [stockStatusFilter, setStockStatusFilter] = useState("All");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const filteredData = AllSportsEquipment?.data?.filter((item) => {
    const matchesQuery = item.ItemName.toLowerCase().includes(
      query.toLowerCase()
    );
    const matchesCustomization =
      customizationFilter === "All" ||
      item.Customization === customizationFilter;

    const matchesStockStatus =
      stockStatusFilter === "All" || item.StockStatus === stockStatusFilter;

    return matchesQuery && matchesCustomization && matchesStockStatus;
  });

  return (
    <div className="my-20 w-11/12 md:w-10/12 mx-auto">
      <Helmet>
        <title>ProPlay Accessories || All Products</title>
      </Helmet>
      <div className="relative pb-10">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search Item"
        />
      </div>
      <div className="flex justify-between items-center mb-10">
        <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
          All Sports Equipment
        </h4>

        <div className="flex justify-center items-center gap-4">
          <label>
            Customization:
            <select
              value={customizationFilter}
              onChange={(e) => setCustomizationFilter(e.target.value)}
              className="ml-2 border rounded-md"
            >
              <option value="All">All</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>
          <label>
            Stock Status:
            <select
              value={stockStatusFilter}
              onChange={(e) => setStockStatusFilter(e.target.value)}
              className="ml-2 border rounded-md"
            >
              <option value="All">All</option>
              <option value="True">Stock In</option>
              <option value="False">Sold Out</option>
            </select>
          </label>
        </div>
        <button
          onClick={handleSortLowestPrice}
          className="btn btn-outline text-xs text-[#4478a7]"
        >
          Sort by Price
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredData.map((singleProduct) => (
          <div
            key={singleProduct._id}
            className="border rounded-lg shadow p-4 flex flex-col items-center text-center"
          >
            <img
              src={singleProduct.Photo}
              alt={singleProduct.ItemName}
              className="w-32 h-32 object-cover rounded-lg mb-4"
            />
            <h5 className="text-lg font-semibold mb-2">
              {singleProduct.ItemName}
            </h5>
            <p className="text-sm text-gray-500">
              {singleProduct.CategoryName}
            </p>
            <p className="text-lg font-bold text-[#4478a7] mb-4">
              ${singleProduct.Price}
            </p>
            {User ? (
              <Link to={`/Details/${singleProduct._id}`}>
                <button className="btn btn-primary w-full">
                  View Details
                </button>
              </Link>
            ) : (
              <Link to="/Login">
                <button className="btn btn-primary w-full">View Details</button>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
