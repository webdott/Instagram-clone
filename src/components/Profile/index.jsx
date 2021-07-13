import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProfileFooter from './ProfileFooter.component';
import ProfileHeader from './ProfileHeader.component';
import { getUserPhotosByUserId } from '../../services/firebase-service';


const UserProfile = ({ user }) => {
    const reducer = (state, newState) => ({ ...state, ...newState });
    const initialState = {
        profile: {},
        photosCollection: [],
        followerCount: 0,
    }

    const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const getProfileInfoAndPhotos = async () => {
            const photos = await getUserPhotosByUserId(user.userId);
            dispatch({
                profile: user,
                photosCollection: photos,
                followerCount: user.followers.length
            });
        };

        getProfileInfoAndPhotos();
    }, [user]);

    return (
        <>
            <ProfileHeader 
                postCount={photosCollection.length}
                profile={profile}
                followerCount={followerCount}
                setFollowerCount={dispatch}
            />
            <ProfileFooter photos={photosCollection}/>
        </>
    );
}

UserProfile.propTypes = {
    user: PropTypes.shape({
        dateCreated: PropTypes.number.isRequired,
        emailAddress: PropTypes.string.isRequired,
        followers: PropTypes.array.isRequired,
        following: PropTypes.array.isRequired,
        fullName: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
    }).isRequired
}

export default UserProfile;
