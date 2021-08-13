import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { getSuggestedProfiles } from '../../services/firebase-service';
import SuggestedProfile from './SuggestedProfile.component';

const Suggestions = ({ userId, docId, following }) => {
    const [profiles, setProfiles] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const suggestedProfiles = async () => {
            const profiles  = await getSuggestedProfiles(userId, following);
            setProfiles(profiles);
            setLoading(false);
        }
        if(userId){
            suggestedProfiles();
        }
    }, [userId, following]);


    return (
        <div>
            {profiles && profiles.length > 0 && (
                <div className='w-full'>
                    <div className="flex justify-between mb-3">
                        <p className='text-gray-faded text-xs font-bold'>Suggestions For You</p>
                        <Link to="/explore/people/suggested">
                            <p className='text-xs font-medium text-black-light'>See All</p>
                        </Link>
                    </div>
                    <div>
                        { profiles.slice(0, 4).map((profile) => {  
                            return(
                                <SuggestedProfile 
                                    fullName={profile.fullName}
                                    userName={profile.username} 
                                    loggedUserDocId={docId}
                                    spDocId={profile.docId}
                                    followers={profile.followers}
                                    email={profile.emailAddress} 
                                    key={profile.docId}
                                    profileId={profile.userId}
                                    userId={userId}
                                />
                            )}
                        )}
                    </div>
                </div>
            )}

            {loading && (
                <>
                    <div className='mb-2'>
                        <Skeleton count={1} height={20}/>
                    </div>
                    <Skeleton count={1} height={130}/>
                </>
            )}
        </div>
    );
};

Suggestions.propTypes = {
    userId: PropTypes.string,
    docId: PropTypes.string,
    following: PropTypes.array
}

export default Suggestions;
