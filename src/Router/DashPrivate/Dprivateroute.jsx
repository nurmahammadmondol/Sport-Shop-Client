import React, { useContext } from 'react';

import { Navigate } from 'react-router-dom';
import { AuthContent } from '../../Components/Provider/AuthProvider';

const Dprivateroute = ({ children }) => {
    const { dashUser, loading } = useContext(AuthContent);
    console.log(dashUser)
    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (dashUser?.isVerified == true) {
        return children;
    }

    return <Navigate to="/dashlogin"></Navigate>;
};

export default Dprivateroute;
