import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useUser from '../../hooks/use-user';
import { isUserFollowingProfileUser } from '../../services/firebase-service';
import Skeleton from 'react-loading-skeleton';
import Avatar from 'react-avatar';

const ProfileHeader = ({ 
    postCount, 
    followerCount, 
    setFollowerCount ,
    profile: { userId: profileUserId, docId: profileDocId, fullName, emailAddress, username: profileUsername, following }, 
    }) => {
    const { user } = useUser();
    const [isFollowingUser, setIsFollowingUser] = useState(false);
    const activeButtonFollow = user.username && user.username !== profileUsername;

    const handleToggleFollow = () => {
        setIsFollowingUser(isFollowingUser => !isFollowingUser);
        setFollowerCount({
            followerCount: isFollowingUser ? followerCount - 1 : followerCount + 1,
        })
    }

    useEffect(() => {
        const isLoggedInUserFollowingProfile = async () => {
            const isFollowing = await isUserFollowingProfileUser(user.username, profileUserId);
            setIsFollowingUser(!!isFollowing); 
        }

        if(user.username && profileUserId) isLoggedInUserFollowingProfile();
    }, [user.username, profileUserId]);

    return (
        <div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg'>
            <div className="container flex justify-center">
                {emailAddress && fullName ? (
                    <Avatar email={emailAddress} name={fullName} round={true} size={'10rem'}/>
                ) : (
                    <Skeleton circle={true} height={'10rem'} width={'10rem'}/>
                )}
            </div>
            <div className="flex items-center justify-center flex-col col-span-2">
                <div className="container flex items-center">
                    <p className="text-2xl mr-4">{profileUsername}</p>
                    {activeButtonFollow && (
                        <button 
                            className={
                                `${isFollowingUser 
                                    ? 'bg-gray-background border border-gray-primary' 
                                    : 'bg-blue-medium' 
                                } 
                                font-bold text-sm rounded text-white w-20 h-8 
                                cursor-pointer flex items-center justify-center focus:outline-none`
                            }
                            type='button'
                            onClick={handleToggleFollow}
                            onKeyDown={(e) => {
                                if(e.key === 'Enter'){
                                    handleToggleFollow();
                                }
                            }}
                        >
                            {isFollowingUser 
                                ? (
                                    <span className='flex items-center justify-center text-black-faded'>
                                        <i className="fas fa-user"></i>
                                        <i className="fas fa-check"></i>
                                    </span>
                                )
                                : 'Follow'
                            }
                        </button>
                    )}
                </div>
                {/* <div className="container mt-4"></div> */}
            </div>
        </div>
    );
};

ProfileHeader.propTypes = {
    postCount: PropTypes.number.isRequired,
    followerCount: PropTypes.number.isRequired,
    setFollowerCount: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        emailAddress: PropTypes.string,
        following: PropTypes.array,
        fullName: PropTypes.string,
        userId: PropTypes.string,
        docId: PropTypes.string,
        username: PropTypes.string,
    }).isRequired,
}

export default ProfileHeader;
