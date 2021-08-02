import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import AddComments from './add-comments.component';

const PostComments = ({ docId, comments: allComments, posted, commentInput, openPostModal, noComments }) => {
    const [comments, setComments] = useState(allComments.reverse()); 

    return (
        <>
            <div className='p-4 pt-1 pb-4'>
                {comments.length > 2 && (
                    <p
                        className={`text-sm text-gray-base font-semibold mb-1 cursor-pointer ${noComments ? 'hidden' : ''}`}
                        onClick={openPostModal}
                    >View all {comments.length} comments</p>
                )}
                {comments.slice(0, 2).map((comment, idx) => (
                    <div className={`flex items-center py-0 mb-1 break-words ${noComments ? 'hidden' : ''}`} key={`${comment.comment}${idx}-${comment.displayName}`}>
                        <Link to={`/u/${comment.displayName}`}>
                            <p className='font-semibold mr-2 cursor-pointer'>{comment.displayName}</p>
                        </Link>
                        <p className='text-sm flex items-center'>
                            {comment.comment}
                        </p>
                    </div>
                ))}
                <p className="text-xxs text-gray-base mt-2">
                    {/* Format date from when post was made */}
                    {
                        `${formatDistance(posted, Date.now())
                            .replaceAll('about', '')
                            .toUpperCase()
                        } AGO`
                    }
                </p>
            </div>
            <AddComments 
                docId={docId}
                comments={comments}
                setComments={setComments}
                ref={commentInput}
            />
        </>
    );
}

PostComments.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    posted: PropTypes.number.isRequired,
    commentInput: PropTypes.object.isRequired,
    openPostModal: PropTypes.func,
    noComments: PropTypes.bool.isRequired
}

export default PostComments;
