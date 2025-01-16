import React, { useContext, useState } from 'react';
import BG from '../../../assets/Photo/bg.png';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContent } from '../../Provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase.config/Firebase';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const SignUp = () => {
  const { CreateUser, CreateUserWithGoogle, setUser } = useContext(AuthContent);
  const navigate = useNavigate();

  const handleRegistration = e => {
    e.preventDefault();

    const form = e.target;

    const name = form.displayName.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;

    const UserProfile = {
      displayName: name,
      photoURL: photo,
    };

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!passwordRegex.test(password)) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Password validation failed',
        text: 'Must contain uppercase, and lowercase letters a number, and be at least 6 characters long.',
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    CreateUser(email, password)
      .then(result => {
        console.log(result.user);
        setUser(result.user);

        updateProfile(auth.currentUser, UserProfile)
          .then(() => {
            // console.log('Update Success');
            navigate('/');
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Your new account has been successfully Registration.',
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch(() => {
            console.log('error update');
          });
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  const handleGoogleProvider = () => {
    CreateUserWithGoogle()
      .then(result => {
        console.log(result.user);
        setUser(result.user);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handelBackButton = () => {
    navigate(-1);
  };

  return (
    <div
      className="my-5 min-h-screen flex flex-col "
      style={{
        backgroundImage: `url(${BG})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <Helmet>
        <title>ProPlay Accessories || Registration</title>
      </Helmet>
      <div>
        <h4
          onClick={handelBackButton}
          className="flex items-center  ml-5 gap-1 rancho-regular "
        >
          <i class="fa-solid fa-arrow-left"></i>Back
        </h4>
      </div>
      <div className="card bg-base-100 w-11/12 md:w-7/12 lg:w-6/12 mx-auto  shrink-0 shadow-2xl my-8">
        <h4 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold mt-5 rancho-regular">
          ProPlay Accessories Registration Page
        </h4>

        <form onSubmit={handleRegistration} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              name="displayName"
              className="input input-bordered"
            // required
            />
          </div>

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

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="input input-bordered"
              required
            />
          </div>

          {/* <div className="form-control">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input
              type="text"
              placeholder="Photo URL"
              name="photo"
              className="input input-bordered"
              required
            />
          </div> */}

          <div className="form-control">
            <label className="cursor-pointer label">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-[#4478a7]"
              />
              <span className="label-text">
                Accept all our terms and conditions.
              </span>
            </label>
          </div>

          <div className="form-control mt-6">
            <button className="btn bg-[#4478a7] text-white">
              Registration
            </button>
          </div>
        </form>

        {/* <div className="divider ">OR</div> */}

        <div className="card-body">
          {/* <button
            onClick={handleGoogleProvider}
            className="w-full btn bg-[#4478a7] text-white"
          >
            <i class="fa-brands fa-google fa-bounce fa-xl"></i>Registration with
            Google
          </button> */}

          <h6 className="text-end ">
            Have an account ?
            <Link to="/LogIn">
              <span className=" ml-2 text-xl font-bold rancho-regular text-[#4478a7]">
                Sign in
              </span>
            </Link>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
