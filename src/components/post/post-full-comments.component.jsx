import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import PostFooter from './post-footer.component';

const PostFullComments = ({ content }) => {
    return (
        <div className='flex-auto max-h-modal-desc border-b border-gray-primary overflow-y-auto'>
            <div className='p-4 pt-1 pb-4'>
                <PostFooter 
                    userName={content.photoAuthorUserName} 
                    caption={content.caption} 
                    withDisplayPicture={true}  
                    content={content}  
                />
                {content.comments.map((comment, idx) => (
                    <div className={`flex items-start ${idx !== content.comments.length - 1 && 'mb-8'}`} key={`${comment.comment}${idx}-${comment.displayName}`}>
                        <Link to={`/u/${content.userName}`} className='flex items-center mr-4'>
                            <Avatar email={content.emailAddress} name={content.fullName} round={true} size={'2.5rem'}/>
                        </Link>
                        <div className='flex items-start py-0 mb-1 break-words relative h-16'>
                            <Link to={`/u/${comment.displayName}`}>
                                <p className='font-semibold mr-2 cursor-pointer'>{comment.displayName}</p>
                            </Link>
                            <p className='text-sm flex items-center'>
                                {comment.comment}
                            </p>
                            
                            <div className="absolute border-b border-gray-secondary left-0 bottom-0 w-12"></div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

PostFullComments.propTypes = {
    content: PropTypes.object.isRequired
}

export default PostFullComments;
