import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { getSuggestedProfiles, getUserById } from '../../services/firebase-service';
import SuggestedProfile from './SuggestedProfile.component';

const Suggestions = ({ userId, docId, following }) => {
    const [profiles, setProfiles] = useState(null);

    useEffect(() => {
        const suggestedProfiles = async () => {
            const profiles  = await getSuggestedProfiles(userId, following);
            setProfiles(profiles)
        }
        if(userId){
            suggestedProfiles();
        }
    }, [userId, following]);

    const getFollowersById = (followers) => {
        return followers.length > 0 
            ? followers.map(async (followerId) => {
                const [{username}] = await getUserById(followerId);
                return username
            })
            : [];
    }


    return (
        profiles && profiles.length > 0 ? (
            <div className='w-full'>
                <div className="flex justify-between mb-3">
                    <p className='text-gray-faded text-xs font-bold'>Suggestions For You</p>
                    <Link to="/explore/people/suggested">
                        <p className='text-xs font-medium text-black-light'>See All</p>
                    </Link>
                </div>
                <div>
                    { profiles.map((profile) => {  
                        const followers = getFollowersById(profile.followers);   
                        console.log(followers);

                        return(
                            <SuggestedProfile 
                                fullName={profile.fullName}
                                userName={profile.username} 
                                loggedUserDocId={docId}
                                spDocId={profile.docId}
                                followers={followers}
                                email={profile.emailAddress} 
                                key={profile.docId}
                                profileId={profile.userId}
                                userId={userId}
                            />
                        )}
                    )}
                </div>
            </div>
        ): 
        (
            <>
                <div className='mb-2'>
                    <Skeleton count={1} height={20}/>
                </div>
                <Skeleton count={1} height={130}/>
            </>
        )
    );
};

Suggestions.propTypes = {
    userId: PropTypes.string,
    docId: PropTypes.string,
    following: PropTypes.array
}

export default Suggestions;
