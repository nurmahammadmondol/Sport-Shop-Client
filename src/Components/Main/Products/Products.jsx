import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContent } from "../../Provider/AuthProvider";

const Products = () => {
  const loadAll_Accessory = useLoaderData();
  const [AllSportsEquipment, setAllSportsEquipment] =
    useState(loadAll_Accessory);

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
    if (onSearch) {
      onSearch(value);
    }
  };

  const filteredData = AllSportsEquipment.filter((item) => {
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
    <div className="my-20 w-11/12 md:w-10/12  mx-auto">
      <div>
        <Helmet>
          <title>ProPlay Accessories || All Products</title>
        </Helmet>
      </div>
      <div className="relative pb-10">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search Item"
        />
        <button
          type="button"
          onClick={() => {}}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 pb-12 text-gray-500 hover:text-blue-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 11a4 4 0 100 8 4 4 0 000-8zM16 16l4 4"
            />
          </svg>
        </button>
      </div>
      <div className="flex  justify-between items-center mb-10">
        <h4 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold  rancho-regular">
          All Sports Equipment
        </h4>

        <div className="flex justify-center items-center gap-4">
          {" "}
          <label>
            Customization:
            <select
              value={customizationFilter}
              onChange={(e) => setCustomizationFilter(e.target.value)}
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
            >
              <option value="All">All</option>
              <option value="Ture">Stock In</option>
              <option value="False">Sold Out</option>
            </select>
          </label>
        </div>
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
              {filteredData.map((singleProduct, index) => (
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
                    {User ? (
                      <Link to={`/Details/${singleProduct._id}`}>
                        <button className="btn btn-xs rounded-none bg-[#4478a7] text-white w-full ">
                          View Details
                        </button>
                      </Link>
                    ) : (
                      <Link to="/Login">
                        <button className="btn btn-xs rounded-none bg-[#4478a7] text-white w-full ">
                          View Details
                        </button>
                      </Link>
                    )}
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
