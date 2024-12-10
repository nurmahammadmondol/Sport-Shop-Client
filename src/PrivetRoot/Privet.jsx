import React, { useContext } from 'react';
import { AuthContent } from '../Components/Provider/AuthProvider';
import { Navigate } from 'react-router-dom';

const Privet = ({ children }) => {
  const { User, loading } = useContext(AuthContent);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (User) {
    return children;
  }

  return <Navigate to="/"></Navigate>;
};

export default Privet;
