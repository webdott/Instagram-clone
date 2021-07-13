import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Header from "../components/header.component";
import UserProfile from "../components/Profile";
import * as ROUTES from '../constants/routes';
import { getUserByUsername } from "../services/firebase-service";

const Profile = () => {
    const { username } = useParams();
    const history = useHistory();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUserExists = async () => {
            const user = await getUserByUsername(username);
            if(user.length > 0){
                setUser(user[0]);
            } else{
                history.push(ROUTES.NOT_FOUND)
            }
        };     
        
        checkUserExists();
    }, [username, history]);

    return user?.username ? (
        <div className='bg-gray-background'>
            <Header />
            <div className='container mx-auto max-w-screen-lg pt-20 px-5'>
                <UserProfile user={user}/>
            </div>
        </div>
    ) : null;
}

export default Profile;
