import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContent } from "../../Provider/AuthProvider";

const MyOrder = () => {
  const { odred } = useContext(AuthContent);
  // Ensure `ordered` is iterable
  const newOrdered = Array.isArray(odred) ? [...odred] : [];
  console.log(newOrdered);
  const loadAll_Accessory = useLoaderData();
  const [AllSportsEquipment, setAllSportsEquipment] =
    useState(loadAll_Accessory);
  const filteredData = AllSportsEquipment.filter((item) => item._id === odred); // Adjust condition

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setAllSportsEquipment((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      }
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-bold mb-4">My Ordered Products</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Photo</th>
              <th className="border border-gray-300 px-4 py-2">Item Name</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Rating</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((product) => (
              <tr key={product._id}>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <img
                    src={product.Photo}
                    alt={product.ItemName}
                    className="h-20 w-20 object-cover mx-auto rounded"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {product.ItemName}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  ${product.Price}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {product.Rating}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {product.Description}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrder;
