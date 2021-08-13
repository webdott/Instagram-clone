import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import PostFooter from './post-footer.component';
import { getUserByUsername } from '../../services/firebase-service';
import Skeleton from 'react-loading-skeleton';

const PostFullComments = ({ content, photoAuthorUserName, photoAuthorFullName, photoAuthorEmailAddress,  closePostModal }) => {
    const [commentAuthorsNames, setCommentAuthorsNames] = useState([]);

    useEffect(() => {
        const getCommentAuthors = async() => {
            const commentAuthorsNames = await Promise.all(content.comments.map(async comment => {
                const [{ emailAddress, fullName }] = await getUserByUsername(comment.displayName);
                return { emailAddress, fullName };
            }));
            setCommentAuthorsNames(commentAuthorsNames);
        };

        getCommentAuthors();
    }, []);

    return (
        <div className='flex-auto max-h-modal-desc border-b border-gray-primary overflow-y-auto'>
            <div className='p-4 pt-1 pb-4'>
                <PostFooter 
                    userName={content.photoAuthorUserName ?? photoAuthorUserName} 
                    fullName={photoAuthorFullName}
                    emailAddress={photoAuthorEmailAddress}
                    caption={content.caption} 
                    withDisplayPicture={true}  
                    content={content}  
                />
                {content.comments.map((comment, idx) => (
                    <div className={`flex items-start ${idx !== content.comments.length - 1 && 'mb-8'}`} key={`${comment.comment}${idx}-${comment.displayName}`}>
                        {commentAuthorsNames[idx]=== undefined || commentAuthorsNames[idx] === undefined 
                            ? (
                                <div className='flex items-center mr-4'>
                                    <Skeleton circle={true} height={'2.5rem'} width={'2.5rem'}/>
                                </div>
                            )
                            : (
                                <Link to={`/u/${comment.displayName}`} className='flex items-center mr-4' onClick={ closePostModal }>
                                    <Avatar email={commentAuthorsNames[idx].emailAddress} name={commentAuthorsNames[idx].fullName} round={true} size={'2.5rem'}/>
                                </Link>
                            )
                        }
                        <div className='flex flex-col custom-sm:flex-row items-start py-0 mb-1 break-words relative h-16'>
                            <Link to={`/u/${comment.displayName}`}  onClick={ closePostModal }>
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
    content: PropTypes.object.isRequired,
    photoAuthorUserName: PropTypes.string,
    photoAuthorFullName: PropTypes.string,
    photoAuthorEmailAddress: PropTypes.string,
    closePostModal: PropTypes.func.isRequired
}

export default PostFullComments;
