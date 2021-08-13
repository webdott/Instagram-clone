import {useState, useContext, useEffect} from 'react';
import { Link } from "react-router-dom";
import FirebaseContext from '../contexts/firebaseContext';
import * as ROUTES from '../constants/routes';
import { doesUserNameExist } from '../services/firebase-service';
import Footer from '../components/footer.component';

const Signup = () => {
    const { firebase } = useContext(FirebaseContext);

    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const isInvalid = email === '' || password === '';

    const handleSignup = async (e) => {
        e.preventDefault();

        const userNameExists = await doesUserNameExist(userName);

        if(!userNameExists.length) {
            try {
                const createdUserResult = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password);

                await createdUserResult.user.updateProfile({
                    displayName: userName
                });

                await firebase.firestore().collection('users').add({
                    userId: createdUserResult.user.uid,
                    username: userName.toLowerCase(),
                    fullName,
                    emailAddress: email.toLowerCase(),
                    following: [],
                    followers: [],
                    dateCreated: Date.now()
                });

            } catch (error) {
                setUserName('');
                setFullName('');
                setEmail('');
                setPassword('');
                setError(error.message);
            }
        } else{
            setUserName('');
            setError('That username is already taken, please use another');
        }
            
    };

    useEffect(() => {
        document.title = 'Sign Up | Instagram-clone'
    }, [])

    return (
        <div className='h-screen flex flex-col justify-center'>
            <div className='container flex flex-col custom-sm:flex-row mx-auto max-w-screen-md justify-center items-center'>
                <div className="hidden custom-sm:flex w-2/4">
                    <img src="/images/iphone-with-profile.jpeg" alt="iphone with instagram app"/>
                </div>
                <div className="flex flex-col w-4/5 custom-sm:w-2/5">
                    <div className='flex flex-col items-center w-full p-4 mb-4 bg-white rounded border border-gray-primary'>    
                        <h1 className="flex justify-center w-full">
                            <img 
                                src="/images/logo.png" 
                                alt="instagram logo"
                                className="mt-2 w-6/12 mb-4"
                            />
                        </h1>

                        { error && <p className="mb-4 text-xs text-red-primary">{error}</p> }

                        <form onSubmit={handleSignup} method="POST">
                            <input 
                                aria-label="Enter your username"
                                type="text"
                                placeholder="Username" 
                                value={userName}
                                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2" 
                                onChange={({ target }) => setUserName(target.value)}  
                            />
                            <input 
                                aria-label="Enter your fullname"
                                type="text"
                                placeholder="Fullname" 
                                value={fullName}
                                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2" 
                                onChange={({ target }) => setFullName(target.value)}  
                            />
                            <input 
                                aria-label="Enter your email address"
                                type="text"
                                placeholder="Email Address" 
                                value={email}
                                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2" 
                                onChange={({ target }) => setEmail(target.value)}  
                            />
                            <input 
                                aria-label="Enter your password"
                                type="password"
                                value={password}
                                placeholder="Password" 
                                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2" 
                                onChange={({ target }) => setPassword(target.value)}  
                            />
                            <button
                                disabled={isInvalid}
                                type='submit'
                                className={`bg-blue-medium text-white w-full rounded py-2 font-bold ${isInvalid && `opacity-50`}`}
                            >Sign Up</button>
                        </form>
                    </div>

                    <div className='flex flex-col justify-center items-center w-full p-4 bg-white rounded border border-gray-primary'>
                        <p className='text-sm'>
                            Already have an account? {` `}
                            <Link to={ROUTES.LOGIN} className='font-bold text-blue-medium'>Log in</Link>
                        </p>
                    </div>
                </div>
            </div>

            <Footer 
                marginTop={6}
            />
        </div>
    );
}

export default Signup;
