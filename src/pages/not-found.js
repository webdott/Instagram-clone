import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/header.component';
import * as ROUTES from '../constants/routes';

const NotFound = () => {
    
    useEffect(() => {
        document.title = 'Not Found | Instagram';
    }, [])

    return (
        <div className='bg-gray-background'>
            <Header />
            <div className='mx-auto max-w-screen-lg'>
                <p className="text-center text-2xl mb-3 font-bold"> Sorry, this page isn't available. </p>
                
                <p className='text-center text-md'>The link you followed may be broken, or the page may have been removed. 
                    <Link to={ROUTES.DASHBOARD} className='text-blue-medium'>  Go back to Instagram.</Link>
                </p>
            </div>
        </div>
    );
}

export default NotFound;
