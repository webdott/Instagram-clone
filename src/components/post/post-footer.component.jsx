import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const PostFooter = ({ userName, caption }) => {
    // Truncate text if text is greater than 25 characters
    const [truncatedCaption, setTruncatedCaption] = useState(`${caption.slice(0, 30)}${caption.length > 30 ? '...' : ''}`)
    const moreTextRef = useRef(null);

    return (
        <div className='flex items-center p-4 py-0 mb-2 break-words'>
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
    caption: PropTypes.string.isRequired
}

export default PostFooter;
