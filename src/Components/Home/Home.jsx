import { Outlet } from 'react-router-dom';
import Navbar from '../Header/Navbar/Navbar';
import Footer from '../Footer/Footer.jsx/Footer';

const Home = () => {
  return (
    <div>
      <div>
        <div className="bg-[#4478a7] py-2">
          <Navbar></Navbar>
        </div>
      </div>
      <div className="min-h-screen ">
        <Outlet></Outlet>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Home;
