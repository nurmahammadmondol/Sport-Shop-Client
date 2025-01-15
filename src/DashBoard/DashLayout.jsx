import React from 'react';

import { Outlet } from 'react-router-dom';
import DashSideber from './DashSideber';

const DashLayout = () => {
    return (
        <div className="flex">
            {/* Sidebar */}
            <DashSideber />

            {/* Main content */}
            <div className="flex-grow overflow-y-auto ml-[290px] bg-gray-100 min-h-screen p-4">
                <Outlet />
            </div>
        </div>
    );
};

export default DashLayout;
