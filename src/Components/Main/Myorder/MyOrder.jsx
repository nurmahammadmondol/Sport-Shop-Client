import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { AuthContent } from "../../Provider/AuthProvider";
import axoissecure from "../../../share/Axoisecure";

const MyOrder = () => {
  const { User, odred } = useContext(AuthContent);


  // Fetch all allpros
  const { data: allpro = [] } = useQuery({
    queryKey: ["allpro"],
    queryFn: async () => {
      const res = await axoissecure.get(`/products/${odred}`);
      return res?.data?.data || [];
    },
  });





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

            </tr>
          </thead>
          <tbody>

            <tr key={allpro._id}>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <img
                  src={allpro.Photo}
                  alt={allpro.ItemName}
                  className="h-20 w-20 object-cover mx-auto rounded"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {allpro.ItemName}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                ${allpro.Price}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {allpro.Rating}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {allpro.Description}
              </td>

            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrder;
