import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useUser from '../../hooks/use-user';
import { isUserFollowingProfileUser, toggleFollow } from '../../services/firebase-service';
import Skeleton from 'react-loading-skeleton';
import Avatar from 'react-avatar';
import getSimilarFollowers from '../../helpers/getSimilarFollowers';
import { getUserById } from '../../services/firebase-service';
import { Link } from 'react-router-dom';

const ProfileHeader = ({ 
    postCount, 
    followerCount, 
    setFollowerCount ,
    profile: { userId: profileUserId, docId: profileDocId, fullName, emailAddress, username: profileUsername, followers, following }, 
}) => {
    const { user } = useUser();
    const [isFollowingUser, setIsFollowingUser] = useState(false);
    const [followerNames, setFollowerNames] = useState([]);
    const activeButtonFollow = user?.username && user.username !== profileUsername;

    const handleToggleFollow = async () => {
        setIsFollowingUser(isFollowingUser => !isFollowingUser);
        setFollowerCount({
            followerCount: isFollowingUser ? followerCount - 1 : followerCount + 1,
        });
        await toggleFollow(isFollowingUser, user?.docId, profileDocId, profileUserId, user?.userId);
    }

    // Change document's title according to username....
    useEffect(() => {
        if(profileUsername) document.title = `@${profileUsername} | Instagram-clone`
    }, [profileUsername]);

    useEffect(() => {
        const isLoggedInUserFollowingProfile = async () => {
            const isFollowing = await isUserFollowingProfileUser(user.username, profileUserId);
            setIsFollowingUser(!!Object.entries(isFollowing).length); 
        }

        // get shared followers
        const getSimilarFollowersNames = async () => {
            const followerIds = getSimilarFollowers(followers, user.following);
            const followerNames = await Promise.all(followerIds.map(async followerId => {
                const [{username}] = await getUserById(followerId);
                return username;
            }));
            setFollowerNames(followerNames);
        }
        
        if(user?.username && profileUserId) {
            isLoggedInUserFollowingProfile();
            getSimilarFollowersNames();
        } 
    }, [user?.username,user?.following, followers, profileUserId]);

    return (
        <div className='grid grid-cols-3 gap-4 justify-around mx-auto max-w-screen-lg'>
            <div className="container flex-col col-span-1 justify-center md:ml-16 h-28 w-28 md:h-40 md:w-40">
                {emailAddress && fullName ? (
                    <Avatar email={emailAddress} name={fullName} round={true} size={'100%'}/>
                ) : (
                    <Skeleton circle={true} height={'100%'} width={'100%'}/>
                )}
            </div>
            <div className="flex items-center justify-center flex-col col-span-2">
                <div className="container flex items-center">
                    <p className="text-2xl mr-4">{profileUsername}</p>
                    {activeButtonFollow ? (
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
                            {isFollowingUser && 
                                (
                                    <span className='flex items-center justify-center text-black-faded'>
                                        <i className="fas fa-user"></i>
                                        <i className="fas fa-check"></i>
                                    </span>
                                )
                            }
                            {!isFollowingUser && 'Follow'}
                        </button>
                    ) : (
                        <button 
                            className='bg-gray-background border border-gray-primary 
                            font-bold text-sm rounded w-24 h-8 cursor-pointer 
                            flex items-center justify-center focus:outline-none'
                            type='button'
                        >
                            <span className='flex items-center justify-center text-black-dark'>Edit Profile</span>
                        </button>
                    )}
                </div>
                <div className="container flex mt-4 mb-4 w-full">
                    {following === undefined ? (
                        <div style={{width: '100%', marginRight: '5%'}}>
                            <Skeleton count={1} height={24}/>
                        </div>
                    ) : (
                        <>
                            <p className='mr-10'>
                                <span className="font-bold">{postCount}</span>{ ' ' }
                                {postCount === 1 ? 'post' : 'posts'}
                            </p>
                            <p className='mr-10'>
                                <span className="font-bold">{followerCount}</span>{ ' ' }
                                {followerCount === 1 ? 'follower' : 'followers'}
                            </p>
                            <p className='mr-10'>
                                <span className="font-bold">{following.length}</span>{ ' ' }
                                following
                            </p>
                        </>
                    )}
                </div>
                <p className="container flex font-semibold">
                    {fullName}
                </p>
                <div className="container flex w-full mt-2">
                    {following === undefined ? (
                        <div style={{width: '100%', marginRight: '5%'}}>
                            <Skeleton count={1} height={24}/>
                        </div>
                    ) : (
                        <p className='cursor-pointer text-gray-faded text-xxs'>
                            {followerNames.length > 0 && activeButtonFollow
                                ? ( 
                                    <>
                                        Followed by {' '} 
                                        <Link to={`/u/${followerNames[0]}`} className='font-bold text-black-dark'>{followerNames[0]}</Link> 
                                        {followerNames[1] ? (<><span>, </span> <Link to={`/u/${followerNames[1]}`} className='font-bold text-black-dark'>{followerNames[1]}</Link></>) : ''}
                                        {followerNames[2] ? (<><span>, </span> <Link to={`/u/${followerNames[2]}`} className='font-bold text-black-dark'>{followerNames[2]}</Link></>) : ''} 
                                        {followerNames.length > 3 ? ` + ${followerNames.length - 3} more` : ''} 
                                    </>
                                )
                                : ''
                            }
                        </p>
                    )}
                </div>
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
