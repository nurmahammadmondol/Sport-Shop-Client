import { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContent } from '../../Provider/AuthProvider';
import QuestionMark from '../../../assets/Photo/question-mark.png';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const MyEquipment = () => {
  const loadAll_Accessory = useLoaderData();
  const { User } = useContext(AuthContent);

  const [userTotalData, setUserTotalData] = useState([]);
  // console.log(userTotalData);

  useEffect(() => {
    const UserAddAllProduct = loadAll_Accessory.filter(
      checkRealUser => checkRealUser?.UserName === User?.displayName
    );
    setUserTotalData(UserAddAllProduct);
  }, []);

  const handleDelateButton = ID => {
    // console.log(ID);

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4478a7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        fetch(
          `https://sports-equipment-store-server-site.vercel.app/All_Accessories/${ID}`,
          {
            method: 'DELETE',
          }
        )
          .then(res => res.json())
          .then(data => {
            console.log(data);

            if (data.deletedCount > 0) {
              if (result.isConfirmed) {
                Swal.fire({
                  title: 'Deleted!',
                  text: 'Your file has been deleted.',
                  icon: 'success',
                  confirmButtonColor: '#4478a7',
                });
              }
            }

            const DeleteItem = userTotalData.filter(item => item._id != ID);
            setUserTotalData(DeleteItem);
          });
      }
    });
  };

  return (
    <div className="w-11/12 md:w-10/12 mx-auto my-10">
      <div>
        <Helmet>
          <title>ProPlay Accessories || My Equipment</title>
        </Helmet>
      </div>
      <h3 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-10 rancho-regular">
        My Equipment List
      </h3>

      {!userTotalData.length > 0 && (
        <div className="">
          <img
            className="w-11/12 md:w-6/12 h-full md:h-[350px] lg:w-[450px] mx-auto"
            src={QuestionMark}
            alt=""
          />
          <h6 className="text-center text-2xl md:text-4xl lg:text-5xl font-bold text-gray-300">
            You have not added any products yet.
          </h6>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 md:gap-10">
        {userTotalData.map(singleData => (
          <div className="w-full border rounded-lg h-full md:h-[250px] p-2 md:p-4 md:flex gap-4 items-center ">
            <div
              className="w-full md:w-2/5 h-[200px] md:h-full border rounded-lg"
              data-aos="fade-right"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine"
            >
              <img
                className="h-full w-full rounded-lg"
                src={singleData.Photo}
                alt=""
              />
            </div>
            <div
              className="w-full md:w-3/5  flex flex-col justify-between space-y-3 md:skew-y-0 mt-4 md:mt-0"
              data-aos="fade-left"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine"
            >
              <h2 className="md:text-xl  font-semibold">
                {singleData.ItemName}
              </h2>
              <p className="text-xs md:text-sm text-gray-400">
                Category : {singleData.CategoryName}
              </p>
              <div className="flex gap-3 lg:gap-8 text-gray-500">
                <small>
                  <i class="fa-solid fa-money-check-dollar mr-1"></i>Price :
                  {singleData.Price}$
                </small>
                <small>
                  <i class="fa-brands fa-shopify mr-1"></i>Stock :
                  {singleData.StockStatus}
                </small>
              </div>
              <div className="flex gap-3 lg:gap-8 text-gray-500">
                <small>
                  <i class="fa-regular fa-star mr-1"></i>Rating :
                  {singleData.Rating}
                </small>
                <small>
                  <i class="fa-regular fa-clock mr-1"></i>Delivery Time :
                  {singleData.ProcessingTime}
                </small>
              </div>
              <div className="flex gap-3 lg:gap-8 text-gray-500">
                <small>
                  <i class="fa-brands fa-intercom mr-1"></i>Customization :
                  {singleData.Customization}
                </small>
                <small>
                  <i class="fa-solid fa-message mr-1"></i>Description :
                  {singleData.Description}
                </small>
              </div>
              <div className=" w-full flex items-center gap-5">
                <Link to={`/Update/${singleData._id}`}>
                  <button className="btn btn-outline btn-sm bg-[#4478a7] text-white">
                    Update
                  </button>
                </Link>
                <button
                  onClick={() => handleDelateButton(singleData._id)}
                  className="btn btn-outline bg-[#4478a7] btn-sm text-white"
                >
                  Delate
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEquipment;
