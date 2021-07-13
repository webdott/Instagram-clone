import { memo } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import Avatar from 'react-avatar';

const User = ({ userName, fullName, email}) => {
    return !userName || !fullName ? (
        <div className='mb-6'>
            <Skeleton count={1} height={50}/>
        </div>
    ) : (
        <div className='grid grid-cols-4 gap-4 mb-6 items-center'>
            <Link to={`/u/${userName}`} className='flex items-center justify-center col-span-1'>
                <Avatar email={email} name={fullName} round={true} size={'3.5rem'}/>
            </Link>
            <div className="col-span-2">
                <Link to={`/u/${userName}`} className='font-bold text-xs'>
                    {userName}
                </Link>
                <p className='text-gray-faded text-xs'>{fullName}</p>
            </div>
            <Link to='#' className='font-semibold text-xs text-blue-faded col-span-1'>
                Switch
            </Link>
        </div>
    )
};

User.propTypes = {
    userName: PropTypes.string,
    fullName: PropTypes.string,
    email: PropTypes.string
}

export default memo(User);

// style={{marginRight: '0.5rem'}}
