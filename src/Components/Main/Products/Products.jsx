import React, { useContext, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { AuthContent } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axoissecure from "../../../share/Axoisecure";

const Products = () => {
  const { User } = useContext(AuthContent);

  const { data: item = [], refetch } = useQuery({
    queryKey: ["pro"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/products`);
        return res?.data?.data || [];
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    },
  });

  // States for filters
  const [query, setQuery] = useState("");
  const [customizationFilter, setCustomizationFilter] = useState("All");
  const [stockStatusFilter, setStockStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  // Filter Logic
  const filteredData = item
    .filter((product) => {
      const matchesQuery = product.ItemName?.toLowerCase().includes(query.toLowerCase());
      const matchesCustomization =
        customizationFilter === "All" || product.Customization === customizationFilter;
      const matchesStockStatus =
        stockStatusFilter === "All" ||
        (stockStatusFilter === "True" && product.StockStatus === "In Stock") ||
        (stockStatusFilter === "False" && product.StockStatus === "Out of Stock");

      return matchesQuery && matchesCustomization && matchesStockStatus;
    })
    .sort((a, b) => {
      if (sortOrder === "lowest") return a.Price - b.Price;
      if (sortOrder === "highest") return b.Price - a.Price;
      return 0; // Default order
    });

  return (
    <div className="my-20 w-11/12 md:w-10/12 mx-auto">
      <Helmet>
        <title>ProPlay Accessories || All Products</title>
      </Helmet>

      {/* Search Input */}
      <div className="relative pb-10">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search Item"
        />
      </div>

      {/* Filters and Sorting */}
      <div className="flex justify-between items-center mb-10">
        <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
          All Sports Equipment
        </h4>

        <div className="flex gap-4">

          <label className="flex items-center gap-2">
            Stock Status:
            <select
              value={stockStatusFilter}
              onChange={(e) => setStockStatusFilter(e.target.value)}
              className="border rounded-md"
            >
              <option value="All">All</option>
              <option value="True">Stock In</option>
              <option value="False">Out of Stock</option>
            </select>
          </label>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setSortOrder("lowest")}
            className={`btn btn-outline text-xs ${sortOrder === "lowest" ? "text-blue-500" : "text-gray-500"
              }`}
          >
            Sort: Lowest Price
          </button>
          <button
            onClick={() => setSortOrder("highest")}
            className={`btn btn-outline text-xs ${sortOrder === "highest" ? "text-blue-500" : "text-gray-500"
              }`}
          >
            Sort: Highest Price
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {filteredData.length > 0 ? (
          filteredData.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg shadow p-4 flex flex-col items-center text-center"
            >
              <img
                src={product.Photo}
                alt={product.ItemName}
                className="w-32 h-32 object-cover rounded-lg mb-4"
              />
              <h5 className="text-xl font-semibold rancho-regular mb-2">
                {product.ItemName}
              </h5>
              <div className="flex items-center gap-3">
                <p className="text-sm text-gray-500">Quantity: {product.quantity || 0}</p>
                <p className="text-sm text-gray-400">
                  <i className="fa-regular fa-star pt-2 mr-1"></i>Rating:
                  {product.Rating}
                </p>
              </div>
              <p className="text-lg font-bold text-[#4478a7] mb-4">
                ৳{product.Price}
              </p>
              <Link to={`/details/${product._id}`}>
                <button className="btn btn-primary w-full">View Details</button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-3 text-center">No products found</p>
        )}
      </div>
    </div>
  );
};

export default Products;
