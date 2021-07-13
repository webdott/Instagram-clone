import { Link } from 'react-router-dom';
import useUser from '../../hooks/use-user';
import Suggestions from './suggestions.component';
import User from './user.component';


const Sidebar = () => {
    const { 
        user: {fullName, username, userId, emailAddress, following, docId}
    } = useUser();

    return (
        <div className='hidden 2md:block mt-28'>
            <User userName={username} fullName={fullName} email={emailAddress}/>
            <Suggestions userId={userId} docId={docId} following={following}/>
            <div className="sidebar-footer">
                <Link to={`##`} className='text-xxs text-gray-secondary'>About &middot; </Link> 
                <Link to={`##`} className='text-xxs text-gray-secondary'>Help &middot; </Link> 
                <Link to={`##`} className='text-xxs text-gray-secondary'>Press &middot; </Link> 
                <Link to={`##`} className='text-xxs text-gray-secondary'>API &middot; </Link> 
                <Link to={`##`} className='text-xxs text-gray-secondary'>Jobs &middot; </Link> 
                <Link to={`##`} className='text-xxs text-gray-secondary'>Privacy &middot; </Link> 
                <Link to={`##`} className='text-xxs text-gray-secondary'>Terms &middot; </Link> 
                <Link to={`##`} className='text-xxs text-gray-secondary'>Locations &middot; </Link> 
                <Link to={`##`} className='text-xxs text-gray-secondary'>Top Accounts &middot; </Link> 
                <Link to={`##`} className='text-xxs text-gray-secondary'>Hashtags &middot; </Link> 
                <Link to={`##`} className='text-xxs text-gray-secondary'>Language</Link>

                <p className='mt-2 text-xxs text-gray-secondary'>
                    © 2021 INSTAGRAM-CLONE BY 
                    <a className='text-blue-medium' href="https://github.com/caspero-62" target='_blank' rel='noreferrer'>
                        &nbsp; Webdot🕷
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Sidebar;
