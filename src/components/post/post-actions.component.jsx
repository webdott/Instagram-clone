import { useState, useContext } from "react";
import PropTypes from 'prop-types';
import FirebaseContext from '../../contexts/firebaseContext';
import UserContext from '../../contexts/userContext';
import { Link } from "react-router-dom";

const PostActions = ({ docId, totalLikes, likedPhoto, handleFocus, likers  }) => {
    const {
        user: {uid: userId = ''}
    } = useContext(UserContext);

    const [isLiked, setIsLiked] = useState(likedPhoto);
    const [likes, setLikes] = useState(totalLikes); 
    const [bookmark, setBookmark] = useState(false);

    const { firebase, FieldValue } = useContext(FirebaseContext);

    const handleLiked = async() => {
        setIsLiked((isLiked) => !isLiked);

        await firebase
            .firestore()
            .collection('photos')
            .doc(docId)
            .update({
                likes: isLiked 
                    ? FieldValue.arrayRemove(userId) 
                    : FieldValue.arrayUnion(userId)
            })

        setLikes((likes) => isLiked ? likes - 1 : likes + 1)
    }

    return(
        <>
            <div className='flex justify-between p-4 pb-2'>
                <div className="flex items-center w-full h-full">
                    <i className={`${isLiked ? 'fas text-red-primary animate-wiggle' : 'far'} fa-heart text-2xl mr-4 cursor-pointer`} 
                        tabIndex={0}
                        onClick={ handleLiked }
                        onKeyDown={(e) => (e.key === 'Enter') ? handleLiked() : null}
                    ></i>
                    <svg aria-label="Comment" className="cursor-pointer mr-4" 
                        fill="#262626" height="23" 
                        viewBox="0 0 48 48" 
                        width="23"
                        tabIndex={0}
                        onClick={handleFocus}
                        onKeyDown={(e) => (e.key === 'Enter') ? handleFocus() : null}
                    >
                        <path clipRule="evenodd" 
                            d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" 
                            fillRule="evenodd"
                        >
                        </path>
                    </svg>
                    <svg aria-label="Direct" className="cursor-pointer" fill="#262626" height="23" viewBox="0 0 48 48" width="23">
                        <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
                    </svg>
                </div>

                <i className={`${bookmark ? 'fas' : 'far'} fa-bookmark text-2xl cursor-pointer`} 
                    onClick={() => setBookmark((bookmark) => !bookmark)}
                ></i>
            </div>

            <div className='p-4 py-0 mb-2'>
                {likes === 1 && likers.includes(userId) 
                    ? '1 like' 
                    : likes === 0 
                        ? '0 likes'
                        : (
                            <p>
                                liked by <Link to='/p/__' className='font-bold'>{likes}</Link> and <span className='font-bold'>others</span>
                            </p>
                        )
                }
            </div>
        </>
    )
}

PostActions.propTypes = {
    docId: PropTypes.string.isRequired,
    totalLikes: PropTypes.number.isRequired,
    likedPhoto: PropTypes.bool.isRequired,
    handleFocus: PropTypes.func.isRequired, 
    likers: PropTypes.array.isRequired
}

export default PostActions;