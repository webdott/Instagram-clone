import { useEffect, useContext, useState } from 'react';
import FirebaseContext from '../contexts/firebaseContext';


const useAuthListener = () => {
    const { firebase } = useContext(FirebaseContext);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    
    useEffect(() => {
        const listener = firebase.auth().onAuthStateChanged((authUser) => {
            if(authUser){
                // add user object to localStorage if it exists
                localStorage.setItem('authUser', JSON.stringify(authUser));
                setUser(authUser);
            } else {
                // remove if user object dosen't exist 
                localStorage.removeItem('authUser');
                setUser(null);
            }
        });

        return () => listener();
    }, [firebase]);

    
    return { user }
}


export default useAuthListener;