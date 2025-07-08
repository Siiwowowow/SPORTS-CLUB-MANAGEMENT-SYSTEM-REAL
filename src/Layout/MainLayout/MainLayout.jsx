import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../Component/Navbar/Navbar';
import Footer from '../../Component/Footer/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='min-h-[calc(100vh-200px)] '>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;