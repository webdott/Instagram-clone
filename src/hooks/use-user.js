import { useContext, useState, useEffect } from 'react';
import UserContext from '../contexts/userContext';
import { getUserById } from '../services/firebase-service';

const useUser = () => {
    const { user } = useContext(UserContext);

    const [activeUser, setActiveUser] = useState({});

    useEffect(() => {
        const getUserObjectById = async () => {
            const [response] = await getUserById(user.uid);
            setActiveUser(response);
        };
        if(user?.uid){
            getUserObjectById();
        }
    }, [user]);

    return { user: activeUser }
}

export default useUser;
