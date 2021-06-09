import { useRef } from 'react';
import PropTypes from 'prop-types';
import PostHeader from './post-header.component';

const Post = ({ content }) => {
    return (
        <div className='mr-4'>
            <PostHeader userName={content.photoAuthorUserName} emailAddress={content.emailAddress} fullName={content.fullName} />
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


