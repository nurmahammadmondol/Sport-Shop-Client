import { useContext } from 'react';
import { AuthContent } from '../../Provider/AuthProvider';
import Marquee from 'react-fast-marquee';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axoissecure from '../../../share/Axoisecure';

const Collection_T = () => {

  const { data: item, refetch } = useQuery({
    queryKey: ["tranding"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/products`);
        console.log(res.data?.data);
        return res.data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });

  return (
    <div className="my-28 h-full">
      <h4 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-10 rancho-regular">
        Trending Collection
      </h4>
      {/* grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 */}
      <Marquee speed={30} pauseOnHover={true} className="space-x-10">
        <div className="flex gap-5  md:gap-10">
          {item?.map(Single_Item => (
            <div className="border rounded-lg h-[300px] md:h-[400px] w-[200px] md:w-[280px] flex flex-col gap-1 md:gap-3">
              <div className="w-full h-2/3  flex justify-center bg-gray-50">
                <img
                  className="w-full h-full"
                  src={Single_Item.Photo}
                  alt={Single_Item.selectedSimpsonCategoryName}
                />
              </div>
              <div className="space-y-1 md:space-y-2 p-2 md:p-3">
                <h6 className="text-xl font-semibold rancho-regular">
                  {Single_Item.ItemName}
                </h6>
                <p className="text-sm text-gray-400">
                  <i class="fa-solid fa-money-check-dollar mr-1"></i>Price :
                  {Single_Item.Price}৳
                </p>
                <p className="text-sm text-gray-400">
                  <i class="fa-regular fa-star mr-1"></i>Rating :
                  {Single_Item.Rating}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Marquee>
      <div className="mt-10 text-center">
        <Link to="/Products">
          <button className="btn text-white bg-[#4478a7]  md:px-8">
            All Products
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Collection_T;
