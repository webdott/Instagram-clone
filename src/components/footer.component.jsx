import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ marginTop }) => {
    return (
        <div className={`mt-${marginTop ?? '36'} text-center`}>
            <Link to={`##`} className='text-xxs text-gray-faded'>About &middot; </Link> 
            <Link to={`##`} className='text-xxs text-gray-faded'>Help &middot; </Link> 
            <Link to={`##`} className='text-xxs text-gray-faded'>Press &middot; </Link> 
            <Link to={`##`} className='text-xxs text-gray-faded'>API &middot; </Link> 
            <Link to={`##`} className='text-xxs text-gray-faded'>Jobs &middot; </Link> 
            <Link to={`##`} className='text-xxs text-gray-faded'>Privacy &middot; </Link> 
            <Link to={`##`} className='text-xxs text-gray-faded'>Terms &middot; </Link> 
            <Link to={`##`} className='text-xxs text-gray-faded'>Locations &middot; </Link> 
            <Link to={`##`} className='text-xxs text-gray-faded'>Top Accounts &middot; </Link> 
            <Link to={`##`} className='text-xxs text-gray-faded'>Hashtags &middot; </Link> 
            <Link to={`##`} className='text-xxs text-gray-faded'>Locations</Link>

            <p className='mt-4 text-xxs text-gray-faded'>
                © 2021 INSTAGRAM-CLONE BY 
                <a className='text-blue-medium' href="https://github.com/caspero-62" target='_blank' rel='noreferrer'>
                    &nbsp; Webdot🕷
                </a>
            </p>
        </div>
    );
}

export default Footer;
