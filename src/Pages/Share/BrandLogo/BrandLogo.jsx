import React from 'react';
import logo from '../../../assets/logo.png';
import { Link } from 'react-router';

const BrandLogo = () => {
    return (
        <Link to={'/'}>
        <div className='flex items-center'>
            <img className='w-10' src={logo} alt="" />
            <p className='text-[15px]  font-bold'>AthletiQ</p>
        </div>
        </Link>
    );
};

export default BrandLogo;