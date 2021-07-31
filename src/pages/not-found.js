import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header.component';
import * as ROUTES from '../constants/routes';

const NotFound = () => {
    
    useEffect(() => {
        document.title = 'Not Found | Instagram-clone';
    }, [])

    return (
        <div className='bg-gray-background'>
            <Header />
            <div className='mx-auto max-w-screen-lg mt-24'>
                <h2 className="text-center text-2xl mb-6 font-bold"> Sorry, this page isn't available. </h2>
                
                <p className='text-center text-md'>The link you followed may be broken, or the page may have been removed. 
                    <Link to={ROUTES.DASHBOARD} className='text-blue-medium'>  Go back to Instagram_Clone.</Link>
                </p>
            </div>
        </div>
    );
}

export default NotFound;
