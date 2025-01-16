import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import axoissecure from '../../../share/Axoisecure';
import CardPaymentModal from '../../../share/CardPaymentModal';
import QuestionMark from '../../../assets/Photo/question-mark.png';
import { AuthContent } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const MyEquipment = () => {
  const { User } = useContext(AuthContent);
  const [value, setValue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // console.log(userTotalData);
  const { data: cart } = useQuery({
    queryKey: ["carthh",],
    queryFn: async () => {
      const res = await axoissecure.get(`/cart/${User?.email}`);
      return res?.data?.data;
    },
  });

  console.log(cart)

  // Fetch all products
  const { data: allpro = [] } = useQuery({
    queryKey: ["allpro"],
    queryFn: async () => {
      const res = await axoissecure.get(`/products`);
      return res?.data?.data || [];
    },
  });

  const macthProducts = cart?.find((email) => email?.email === User?.email)



  // Filter products to match those related to the user's orders
  const productFilter = allpro?.filter((product) =>
    macthProducts?.productIds?.includes(product._id)
  );
  console.log(macthProducts?.productIds);

  const [filterdata, setFilteredProducts] = useState(productFilter)
  const openModal = (product) => {
    setIsModalOpen(true);
    setValue(product);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCancel = (orderId) => {
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
        const updatedProducts = filterdata?.filter((i) => i?._id !== orderId);
        setFilteredProducts(updatedProducts);

        Swal.fire("Removed!", "The order has been removed.", "success");
      }
    });


  };

  return (
    <>
      <CardPaymentModal isOpen={isModalOpen} onClose={closeModal} value={value} />
      <div className="w-11/12 md:w-10/12 mx-auto my-10">
        <Helmet>
          <title>ProPlay Accessories || My Equipment</title>
        </Helmet>

        <h3 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-10 rancho-regular">
          My Equipment List
        </h3>

        {!filterdata?.length ? (
          <div>
            <img
              className="w-11/12 md:w-6/12 h-full md:h-[350px] lg:w-[450px] mx-auto"
              src={QuestionMark}
              alt="No products"
            />
            <h6 className="text-center text-2xl md:text-4xl lg:text-5xl font-bold text-gray-300">
              You have not added any products yet.
            </h6>
          </div>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Image</th>
                <th className="border border-gray-300 px-4 py-2">Item Name</th>
                <th className="border border-gray-300 px-4 py-2">Category</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Stock</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterdata?.map((product) => (
                <tr key={product._id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    <img src={product.Photo} alt={product.ItemName} className="w-16 h-16 mx-auto" />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{product.ItemName}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.CategoryName}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.Price}$</td>
                  <td className="border border-gray-300 px-4 py-2">{product.StockStatus}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => openModal(product)}
                      className="btn btn-outline btn-sm bg-blue-500 text-white mr-2"
                    >
                      Pay
                    </button>
                    <button
                      onClick={() => handleCancel(product._id)}
                      className="btn btn-outline btn-sm bg-red-500 text-white"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default MyEquipment;
