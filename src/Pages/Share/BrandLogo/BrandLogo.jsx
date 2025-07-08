import React from 'react';
import logo from '../../../assets/logo.png';
import { Link } from 'react-router';

const BrandLogo = () => {
    return (
        <Link to={'/'}>
        <div className='flex items-center'>
            <img className='w-16' src={logo} alt="" />
            <p className='text-2xl  font-bold'>AthletiQ</p>
        </div>
        </Link>
    );
};

export default BrandLogo;