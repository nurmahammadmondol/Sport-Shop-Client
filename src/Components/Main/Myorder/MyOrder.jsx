import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { AuthContent } from "../../Provider/AuthProvider";
import axoissecure from "../../../share/Axoisecure";

const MyOrder = () => {
  const { User, odred } = useContext(AuthContent);

  console.log(odred)
  // Fetch all orders and store them in local state
  const { data: allpro } = useQuery({
    queryKey: ["allprfff", odred],
    queryFn: async () => {
      const res = await axoissecure.get(`/products/${odred}`);
      // setProducts(res?.data?.data)
      return res?.data?.data || [];

    },
  });

  const [products, setProducts] = useState({ allpro });
  console.log(products)
  // Cancel order handler
  const handleCancelOrder = (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove the order from your list.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        // Update the state to remove the product
        const updatedProducts = products?.allpro?._id !== orderId;
        setProducts(updatedProducts);

        Swal.fire("Removed!", "The order has been removed.", "success");
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
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>

            <tr key={products?._id}>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <img
                  src={products?.allpro?.Photo}
                  alt={products?.allpro?.ItemName}
                  className="h-20 w-20 object-cover mx-auto rounded"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {products?.allpro?.ItemName}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                ৳{products?.allpro?.Price}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {products?.allpro?.Rating}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {products?.allpro?.Description}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                  onClick={() => handleCancelOrder(products?.allpro?._id)}
                >
                  Cancel
                </button>
              </td>
            </tr>

            {products?.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrder;
