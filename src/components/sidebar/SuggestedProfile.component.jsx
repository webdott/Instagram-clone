import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import Avatar from 'react-avatar';
import { updateFollowersById, updateFollowingById } from '../../services/firebase-service';

const SuggestedProfile = ({ 
    userName, 
    fullName,
    loggedUserDocId,
    spDocId, 
    followers, 
    email, 
    profileId, 
    userId
}) => {
    const [followed, setFollowed] = useState(false);

    const handleFollowUser = async () => {
        setFollowed(true);
        try{
            // update followers of the followedId (suggested profile) by the user's id
            await updateFollowersById(spDocId, userId, false);
            
            // update following of the user's id by the followed id
            await updateFollowingById(loggedUserDocId, profileId, false);
        } catch (err) {
            console.log(err);
        }

    }

    return !followed && (
        <div className='grid grid-cols-4 gap-4 mb-6 items-center'>
            <Link to={`/p/${userName}`} className='flex items-center justify-center col-span-1'>
                <Avatar email={email} name={fullName} round={true} size={'2.5rem'}/>
            </Link>
            <div className="col-span-2">
                <Link to={`/p/${userName}`} className='font-bold text-xs hover:underline'>
                    {userName}
                </Link>
                <p className='text-gray-faded text-xs overflow-hidden overflow-ellipsis'>
                    {followers.length > 0 ? 
                        `Followed by ${followers[0]} ${followers.length > 1 ? `+ ${followers.length - 1} more` : ''}` 
                    : 
                        `Suggested for you`
                    }
                    
                </p>
            </div>
            <button className='font-semibold text-xs text-blue-faded col-span-1 cursor-pointer' onClick={() => handleFollowUser(userId, profileId)}>
                Follow
            </button>
        </div>
    )
}

SuggestedProfile.propTypes = {
    userName: PropTypes.string,
    fullName: PropTypes.string,
    loggedUserDocId: PropTypes.string,
    spDocId: PropTypes.string,
    email: PropTypes.string,
    profileId: PropTypes.string,
    userId: PropTypes.string,
    followers: PropTypes.array,
}

export default SuggestedProfile;











