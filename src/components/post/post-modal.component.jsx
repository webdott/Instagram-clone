import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import PostHeader from './post-header.component';
import PostComments from './post-comments.component';
import PostFooter from './post-footer.component';
import PostActions from './post-actions.component';
import PostFullComments from './post-full-comments.component';

const PostModal = ({ postContent, closePostModal }) => {
    const modalRef = useRef();
    const commentInput = useRef(null);
    const handleFocus  = () => commentInput.current.focus();

    useEffect(() => {
        const modalContainer = modalRef.current;

        if(modalRef) modalContainer.addEventListener('click', (e) => {
            if(!(e.target instanceof SVGElement) && e.target.className.includes('modal-wrap')) {closePostModal()}
        });
        return () => {
            modalContainer.removeEventListener('click', (e) => {
                if(!(e.target instanceof SVGElement) && e.target.className.includes('modal-wrap')) {closePostModal()}
            });
        };
    }, []);

    return (
        <div 
            className='modal-wrap fixed inset-0 z-20 px-10 w-screen h-screen bg-black-modal flex items-center justify-center'
            ref={modalRef}
        >
            <p 
                className="absolute top-8 z-25 cursor-pointer right-8 text-white text-3xl"
                onClick={closePostModal}
            >
                <i className="fas fa-times"></i>
            </p>
            <div className="flex w-full max-w-modal min-h-picture-small max-h-picture bg-white">
                <div className="max-w-modal-picture min-h-picture-small max-h-picture">
                    <img 
                        className='h-full object-cover' 
                        src={postContent.imageSrc} 
                        alt={postContent.caption} 
                    />
                </div>

                <div className="min-w-modal-desc max-w-modal-desc min-h-picture-small max-h-picture flex flex-col">
                    <PostHeader 
                        userName={postContent.photoAuthorUserName} 
                        emailAddress={postContent.emailAddress} 
                        fullName={postContent.fullName} 
                    />
                    <PostFullComments 
                        content={postContent}
                    />
                    <PostActions
                        docId={postContent.docId} 
                        totalLikes={postContent.likes.length} 
                        likedPhoto={postContent.userLikedPhoto} 
                        likers={postContent.likes}
                        handleFocus={handleFocus}
                    />
                    <PostComments 
                        docId={postContent.docId} 
                        comments={postContent.comments} 
                        posted={postContent.dateCreated} 
                        commentInput={commentInput}
                        noComments={true}
                    />
                </div>
            </div>
        </div>
    );
}

PostModal.propTypes = {
    postContent: PropTypes.object.isRequired,
    closePostModal: PropTypes.func.isRequired
}

export default PostModal;
