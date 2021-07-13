import Avatar from 'react-avatar';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PostHeader = ({ userName, emailAddress, fullName }) => {
    return (
        <div className='flex items-center justify-between border-b border-gray-primary h-4 p-4 py-8'>
            <div className="flex items-center">
                <Link to={`/u/${userName}`} className='flex items-center mr-4'>
                    <Avatar email={emailAddress} name={fullName} round={true} size={'2.5rem'}/>
                </Link>
                <Link to={`/u/${userName}`} className='text-sm text-black-primary font-medium  hover:underline'>
                    {userName}
                </Link>
            </div>
            <div className='cursor-pointer'>
                <svg fill="#262626" height="16" viewBox="0 0 48 48" width="16">
                    <circle clipRule="evenodd" cx="8" cy="24" fillRule="evenodd" r="4.5"></circle>
                    <circle clipRule="evenodd" cx="24" cy="24" fillRule="evenodd" r="4.5"></circle>
                    <circle clipRule="evenodd" cx="40" cy="24" fillRule="evenodd" r="4.5"></circle>
                </svg>
            </div>
        </div>
    );
}

PostHeader.propTypes = {
    userName: PropTypes.string.isRequired,
    emailAddress: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired
}

export default PostHeader;
