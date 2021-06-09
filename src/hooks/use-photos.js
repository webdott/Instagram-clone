import {useState, useEffect, useContext} from 'react';
import UserContext from '../contexts/userContext';
import { getPhotosById, getUserById } from '../services/firebase-service';


const usePhotos = () => {
    const [photos, setPhotos] = useState(null);
    const {
        user: { uid: userId = '' }
    } = useContext(UserContext);

    useEffect(() => {
        const getTimelinePhotos = async () => {
            const [{ following }] = await getUserById(userId);
            let followedUsersPhotos = [];

            //check if the user actually follows anyone
            if(following?.length > 0){
                followedUsersPhotos = await getPhotosById(userId, following);
            }

            followedUsersPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
            setPhotos(followedUsersPhotos);
        }

        if(userId){
            getTimelinePhotos();
        }
    }, [userId])

    return {photos};
}

export default usePhotos;