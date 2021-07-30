import {firebase, FieldValue} from '../lib/firebase';

export const doesUserNameExist = async (username) => {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();

    return result.docs.map(user => user.data().length > 0);
}

export const getUserByUsername = async (username) => {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();

    const user = result.docs.map(item => ({
        ...item.data(),
        docId: item.id
    }));

    return user.length > 0 ? user : false;
}


export const getUserPhotosByUserId = async (userId) => {
    const result = await firebase
        .firestore()
        .collection('photos')
        .where('userId', '==', userId)
        .get();

    const photos = result.docs.map(item => ({
        ...item.data(),
        docId: item.id
    }));

    return photos;
}


export const getUserById = async (userId) => {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('userId', '==', userId)
        .get();

    const user = result.docs.map(item => ({
        ...item.data(),
        docId: item.id
    }));

    return user;
}

export const getSuggestedProfiles = async (id, following) => {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('userId', 'not-in', [...following, id])
        .limit(5)
        .get();

    const profiles = result.docs.map(item => ({
        ...item.data(),
        docId: item.id
    }));

    return profiles;
}

export const updateFollowersById = async (
    userDocId, // currently logged in user
    followerId, // user that is followed by me
    isFollowedByProfile // Am I followed by profile?
) => {
    return firebase
        .firestore()
        .collection('users')
        .doc(userDocId)
        .update({
            followers: isFollowedByProfile 
                ? FieldValue.arrayRemove(followerId) 
                : FieldValue.arrayUnion(followerId)
        })
}


export const updateFollowingById = async (
    userDocId, // currently logged in user
    followedId, // user that's followed Id
    isFollowingProfile // Am I following the profile?
) => {
    return firebase
        .firestore()
        .collection('users')
        .doc(userDocId)
        .update({
            following: isFollowingProfile 
                ? FieldValue.arrayRemove(followedId) 
                : FieldValue.arrayUnion(followedId)
        })
}

export const isUserFollowingProfileUser = async (loggedInUserUsername, profileUserId) => {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', loggedInUserUsername)
        .where('following', 'array-contains', profileUserId)
        .get();

    const [response = {}] = result.docs.map(item => ({
        ...item.data(),
        docId: item.id
    }));
    return response;
}

export const getPhotosById = async (userId, following) => {
    const result = await firebase
        .firestore()
        .collection('photos')
        .where('userId', 'in', following)
        .get();

        
    const photos = result.docs.map(photo => ({
        ...photo.data(),
        docId: photo.id 
    }));
        
    /*
        => get photos posted by people you follow
    */ 
    const photosWithUserDetails = await Promise.all(
        photos.map(async photo => {
            let userLikedPhoto = false;
            if (photo.likes.includes(userId)){
                userLikedPhoto = true;
            }
        
            const photoAuthor = await getUserById(photo.userId);
            const { username: photoAuthorUserName = '', emailAddress, fullName } = photoAuthor[0];

            return { photoAuthorUserName, emailAddress, fullName, ...photo, userLikedPhoto };
        })
    )

    return photosWithUserDetails;
}

export const toggleFollow = async(
    isFollowingProfile, 
    activeUserDocId, 
    profileDocId, 
    profileUserId, 
    followingUserId
) =>{
    await updateFollowingById(activeUserDocId, profileUserId, isFollowingProfile);
    await updateFollowersById(profileDocId, followingUserId, isFollowingProfile);
}
