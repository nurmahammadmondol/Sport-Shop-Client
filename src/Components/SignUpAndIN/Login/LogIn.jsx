import React, { useContext, useState } from 'react';
import BG from '../../../assets/Photo/bg.png';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContent } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const LogIn = () => {
  const { CreateUserWithGoogle, SignIn, User, setUser } = useContext(AuthContent);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleLogIn = (e) => {
    e.preventDefault();

    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;
    SignIn(email, password)
      .then((result) => {
        console.log(result.user);
        setUser(result.user);
        navigate('/');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your account has been successfully logged in.',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error.message);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email and password are incorrect!',
          confirmButtonColor: '#4478a7',
          footer: '<a href="/Registration">Why do I have this issue?</a>',
        });
      });
  };

  const handleGoogleProvider = () => {
    CreateUserWithGoogle()
      .then((result) => {
        console.log(result.user);
        setUser(result.user);
        navigate('/');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your account has been successfully logged in.',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handelBackButton = () => {
    navigate(-1);
  };

  return (
    <div
      className="my-5 min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${BG})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <Helmet>
        <title>ProPlay Accessories || Login</title>
      </Helmet>
      <div>
        <h4
          onClick={handelBackButton}
          className="flex items-center ml-5 gap-1 rancho-regular"
        >
          <i className="fa-solid fa-arrow-left"></i>Back
        </h4>
      </div>
      <div className="card bg-base-100 w-11/12 md:w-7/12 lg:w-6/12 mx-auto shrink-0 shadow-2xl my-8">
        <h4 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold mt-5 rancho-regular">
          LogIn Your Account
        </h4>

        <form onSubmit={handleLogIn} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              name="password"
              className="input input-bordered"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-12 cursor-pointer"
            >
              <i className={showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'}></i>
            </span>
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-[#4478a7] text-white">Login</button>
          </div>
        </form>

        <div className="divider">Or</div>

        <div className="card-body">
          <button
            onClick={handleGoogleProvider}
            className="w-full btn bg-[#4478a7] text-white"
          >
            <i className="fa-brands fa-google fa-bounce fa-xl"></i>Login with Google
          </button>

          <h6 className="text-end mt-5">
            Don't have an account?
            <Link to="/Registration">
              <span className="ml-2 text-xl font-bold rancho-regular text-[#4478a7]">
                Sign up
              </span>
            </Link>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
