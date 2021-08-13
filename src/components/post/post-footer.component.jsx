import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';

const PostFooter = ({ userName, fullName, emailAddress, caption, withDisplayPicture, content }) => {
    // Truncate text if text is greater than 25 characters
    const [truncatedCaption, setTruncatedCaption] = useState(`${caption.slice(0, 30)}${caption.length > 30 ? '...' : ''}`)
    const moreTextRef = useRef(null);

    return (
        withDisplayPicture ?
            <div className='flex mt-4 break-words h-16 mb-8 items-start'>
                <Link to={`/u/${userName}`} className='flex items-center mr-4'>
                    <Avatar email={content.emailAddress ?? emailAddress} name={content.fullName ?? fullName} round={true} size={'2.5rem'}/>
                </Link>
                <div className="relative flex items-start h-16">
                    <p className='font-semibold mr-2'>
                        <Link to={`/u/${userName}`}>
                            {userName}
                        </Link>
                    </p>
                    <p>
                        {truncatedCaption} 
                        {caption.length > 30 
                            ? <span 
                                ref={moreTextRef}
                                className='cursor-pointer text-sm text-gray-base' 
                                onClick={() => {
                                    setTruncatedCaption(caption);
                                    moreTextRef.current.style.display = 'none';
                                }}
                            >
                                more
                            </span> 
                            : null
                        }
                    </p>
                    <div className="absolute border-b border-gray-secondary left-0 bottom-0 w-12"></div>
                </div>
            </div> 
            :
            <div className='flex items-start p-4 py-0 mb-2 break-words'>
                <p className='font-semibold mr-2'>
                    <Link to={`/u/${userName}`}>
                        {userName}
                    </Link>
                </p>
                <p>
                    {truncatedCaption} 
                    {caption.length > 30 
                        ? <span 
                            ref={moreTextRef}
                            className='cursor-pointer text-sm text-gray-base' 
                            onClick={() => {
                                setTruncatedCaption(caption);
                                moreTextRef.current.style.display = 'none';
                            }}
                        >
                            more
                        </span> 
                        : null
                    }
                </p>
            </div>
    );
}

PostFooter.propTypes = {
    userName: PropTypes.string.isRequired,
    fullName: PropTypes.string,
    emailAddress: PropTypes.string,
    caption: PropTypes.string.isRequired,
    withDisplayPicture: PropTypes.bool.isRequired,
    content: PropTypes.object
}

export default PostFooter;
