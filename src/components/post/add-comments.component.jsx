import {forwardRef, useContext, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import FirebaseContext from '../../contexts/firebaseContext';
import UserContext from '../../contexts/userContext';

const AddComments = forwardRef(({ docId, comments, setComments }, ref ) => {
    const [comment, setComment] = useState('');
    const placeholderRef = useRef(null);
    const { firebase, FieldValue } = useContext(FirebaseContext);
    const {
        user: { displayName }
    } = useContext(UserContext);

    const submitComment = (e) => {
        e.preventDefault();
        const commentToPost = comment.trim();
        if(commentToPost.length >= 1) {
            console.log('me');
            setComments([{ displayName, comment: commentToPost }, ...comments]);
            setComment('');
            ref.current.innerText = '';

            return firebase
                .firestore()
                .collection('photos')
                .doc(docId)
                .update({
                    comments: FieldValue.arrayUnion({displayName, comment: commentToPost})
                })
        } else{
            return null
        }
    }

    const handleKeyDown = (e) => {
        if((e.which || e.keyCode)  === 13 && e.shiftKey){
            document.execCommand('insertHTML', false, '\n');
            return false;
        }
        if(e.key === 'Enter'){
            submitComment(e);
        }
    }

    return (
        <>
            <form 
                className='add-comment-form border-t border-gray-primary p-4 flex items-center justify-between'
                onSubmit={(e) => submitComment(e)}
            >
                <div className="add-comment relative text-sm w-full f-hull">
                    <div
                        type="text" 
                        ref={ref} 
                        contentEditable
                        spellCheck
                        className='input outline-none text-sm w-full max-h-10'  
                        value={comment}
                        onInput={() => setComment(ref.current.innerText)}  
                        onKeyDown={handleKeyDown}
                        tabIndex={0}
                    >
                    </div>
                    <p 
                        className={`absolute text-gray-base ${!comment.length || comment === '\n' ? '' : 'opacity-0 hidden'}`}
                        ref={placeholderRef}
                    >Add a comment...</p>
                </div>
                <button 
                    className={`font-semibold text-blue-faded ${comment.trim().length ? '' : 'opacity-30'}`}
                    disabled={!comment.trim().length}
                    onClick={(e) => submitComment}
                >
                    Post
                </button>
            </form>
        </>
    );
})

AddComments.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    setComments: PropTypes.func.isRequired,
}

export default AddComments;
