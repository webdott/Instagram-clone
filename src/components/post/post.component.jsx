import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import PostHeader from './post-header.component';
import PostImage from './post-image.component';
import PostActions from './post-actions.component';
import PostFooter from './post-footer.component';
import PostComments from './post-comments.component';
import PostModal from './post-modal.component';

const Post = ({ content }) => {
    const commentInput = useRef(null);
    const handleFocus  = () => commentInput.current.focus();

    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className='mb-6 rounded bg-white border border-gray-primary '>
            <PostHeader userName={content.photoAuthorUserName} emailAddress={content.emailAddress} fullName={content.fullName} />
            <PostImage src={content.imageSrc} caption={content.caption} />
            <PostActions
                docId={content.docId} 
                totalLikes={content.likes.length} 
                likedPhoto={content.userLikedPhoto} 
                likers={content.likes}
                handleFocus={handleFocus}
            />
            <PostFooter userName={content.photoAuthorUserName} caption={content.caption} withDisplayPicture={false} />
            <PostComments 
                docId={content.docId} 
                comments={content.comments} 
                posted={content.dateCreated} 
                commentInput={commentInput}
                openPostModal={() => setModalOpen(true)}
                noComments={false}
            />

            {modalOpen && 
                <PostModal 
                    postContent={content}
                    closePostModal={() => setModalOpen(false)}
                />
            }
        </div>
    );
}

Post.propTypes = {
    content: PropTypes.shape({
        photoAuthorUserName: PropTypes.string.isRequired,
        emailAddress: PropTypes.string.isRequired,
        fullName: PropTypes.string.isRequired, 
        imageSrc: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
        docId: PropTypes.string.isRequired,
        userLikedPhoto: PropTypes.bool.isRequired,
        likes: PropTypes.array.isRequired,
        comments: PropTypes.array.isRequired,
        dateCreated: PropTypes.number.isRequired,
    }),
}

export default Post;


