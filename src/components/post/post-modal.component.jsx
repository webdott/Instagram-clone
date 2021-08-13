import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import PostHeader from './post-header.component';
import PostComments from './post-comments.component';
import PostActions from './post-actions.component';
import PostFullComments from './post-full-comments.component';
import { getUserById } from '../../services/firebase-service';
import UserContext from '../../contexts/userContext';

const PostModal = ({ postContent, closePostModal }) => {
    const { user: currentUser } = useContext(UserContext);
    const modalRef = useRef();
    const commentInput = useRef(null);
    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [userLikedPhoto, setUserLikedPhoto] = useState(false);
    const handleFocus  = () => commentInput.current.focus();

    const getPhotoAuthor = async () => {
        const userId = postContent.userId;
        const [{username, emailAddress, fullName}] = await getUserById(userId);
        setUserName(username);
        setEmailAddress(emailAddress);
        setFullName(fullName);
    }

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
    }, [closePostModal]);

    useEffect(() => {
        // prevent scroll on body when modal is open
        const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
        document.body.style.position = 'fixed';
        document.body.style.width = '100vw';
        document.body.style.top = `-${scrollY}`;
        getPhotoAuthor();
        if(postContent.likes.includes(currentUser.uid)) setUserLikedPhoto(true);

        return(() => {
            document.body.style.position = 'relative';
        });
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
            <div className="flex flex-col extra-sm:flex-row w-full max-w-modal min-h-picture-small max-h-picture bg-white overflow-y-auto">
                <div className="extra-sm:min-w-modal-desc extra-sm:max-w-modal-desc max-h-picture flex flex-col extra-sm:hidden">
                    <PostHeader 
                        userName={postContent.photoAuthorUserName ?? userName} 
                        emailAddress={postContent.emailAddress ?? emailAddress} 
                        fullName={postContent.fullName ?? fullName} 
                    />
                </div>
                <div className="extra-sm:max-w-modal-picture extra-sm:min-h-picture-small extra-sm:max-h-picture">
                    <img 
                        className='w-full h-full object-cover' 
                        src={postContent.imageSrc} 
                        alt={postContent.caption} 
                    />
                </div>

                <div className="extra-sm:min-w-modal-desc extra-sm:max-w-modal-desc min-h-picture-small max-h-picture flex flex-col">
                    <div className='w-full hidden extra-sm:block'>
                        <PostHeader 
                            userName={postContent.photoAuthorUserName ?? userName} 
                            emailAddress={postContent.emailAddress ?? emailAddress} 
                            fullName={postContent.fullName ?? fullName} 
                        />
                    </div>
                    <PostFullComments 
                        content={postContent}
                        photoAuthorUserName={userName}
                        photoAuthorFullName={fullName}
                        photoAuthorEmailAddress={emailAddress}
                    />
                    <PostActions
                        docId={postContent.docId} 
                        totalLikes={postContent.likes.length} 
                        likedPhoto={postContent.userLikedPhoto ?? userLikedPhoto} 
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
