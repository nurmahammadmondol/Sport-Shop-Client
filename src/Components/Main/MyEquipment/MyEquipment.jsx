import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import axoissecure from '../../../share/Axoisecure';
import CardPaymentModal from '../../../share/CardPaymentModal';
import { AuthContent } from '../../Provider/AuthProvider';
import QuestionMark from '../../../assets/Photo/question-mark.png';

const MyEquipment = () => {
  const { User } = useContext(AuthContent);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const { data: cart } = useQuery({
    queryKey: ['carthh'],
    queryFn: async () => {
      const res = await axoissecure.get(`/cart/${User?.email}`);
      return res?.data?.data;
    },
  });

  const { data: allpro = [] } = useQuery({
    queryKey: ['allpro'],
    queryFn: async () => {
      const res = await axoissecure.get(`/products`);
      return res?.data?.data || [];
    },
  });

  const matchedProducts = cart?.find((email) => email?.email === User?.email);
  const productFilter = allpro?.filter((product) =>
    matchedProducts?.productIds?.includes(product._id)
  );

  const openModal = (products) => {

    setTotalPrice(products);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProducts([]);
  };

  const toggleProductSelection = (product) => {
    const alreadySelected = selectedProducts.find((p) => p._id === product._id);
    if (alreadySelected) {
      setSelectedProducts(selectedProducts.filter((p) => p._id !== product._id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const selectAllProducts = () => {
    setSelectedProducts(productFilter);
  };

  const cancelSelection = () => {
    setSelectedProducts([]);
  };

  return (
    <>
      <CardPaymentModal isOpen={isModalOpen} onClose={closeModal} value={totalPrice} />
      <div className="w-11/12 md:w-10/12 mx-auto my-10">
        <Helmet>
          <title>ProPlay Accessories || My Equipment</title>
        </Helmet>
        <h3 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-10 rancho-regular">
          My Equipment List
        </h3>

        {!productFilter?.length > 0 ? (
          <div>
            <img
              className="w-11/12 md:w-6/12 h-full md:h-[350px] lg:w-[450px] mx-auto"
              src={QuestionMark}
              alt=""
            />
            <h6 className="text-center text-2xl md:text-4xl lg:text-5xl font-bold text-gray-300">
              You have not added any products yet.
            </h6>
          </div>
        ) : (
          <>
            <div className="flex justify-between mb-5">
              <button onClick={selectAllProducts} className="btn btn-primary">
                Select All to Pay
              </button>
              <button onClick={cancelSelection} className="btn btn-secondary">
                Cancel
              </button>
            </div>
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Select</th>
                  <th className="border border-gray-300 px-4 py-2">Image</th>
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Category</th>
                  <th className="border border-gray-300 px-4 py-2">Price</th>
                  <th className="border border-gray-300 px-4 py-2">Stock</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {productFilter.map((singleData) => (
                  <tr key={singleData._id}>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={selectedProducts.some((p) => p._id === singleData._id)}
                        onChange={() => toggleProductSelection(singleData)}
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <img src={singleData.Photo} alt="" className="w-16 h-16 object-cover" />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{singleData.ItemName}</td>
                    <td className="border border-gray-300 px-4 py-2">{singleData.CategoryName}</td>
                    <td className="border border-gray-300 px-4 py-2">{singleData.Price}৳</td>
                    <td className="border border-gray-300 px-4 py-2">{singleData.StockStatus}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => openModal(singleData)}
                        className="btn btn-sm btn-success"
                      >
                        Pay
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right mt-5">
              <button
                onClick={() => openModal(selectedProducts)}
                className="btn btn-success"
                disabled={selectedProducts.length === 0}
              >
                Proceed to Pay
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MyEquipment;
