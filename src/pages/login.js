import {useState, useContext, useEffect} from 'react';
import { Link } from "react-router-dom";
import FirebaseContext from '../contexts/firebaseContext';
import * as ROUTES from '../constants/routes';
import Footer from '../components/footer.component';

const Login = () => {
    const { firebase } = useContext(FirebaseContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const isInvalid = email === '' || password === '';

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            setEmail('');
            setPassword('');
            setError(error.message);
        }
    };

    useEffect(() => {
        document.title = 'Login | Instagram-clone'
    }, [])

    return (
        <div className='h-screen flex flex-col justify-center'>
            <div className='container flex mx-auto max-w-screen-md items-center justify-center'>
                <div className="flex w-2/4">
                    <img src="/images/iphone-with-profile.jpeg" alt="iphone with instagram app"/>
                </div>
                <div className="flex flex-col w-2/5">
                    <div className='flex flex-col items-center w-full p-4 mb-4 bg-white rounded border border-gray-primary'>    
                        <h1 className="flex justify-center w-full">
                            <img 
                                src="/images/logo.png" 
                                alt="instagram logo"
                                className="mt-2 w-6/12 mb-4"
                            />
                        </h1>

                        { error && <p className="mb-4 text-xs text-red-primary">{error}</p> }

                        <form onSubmit={handleLogin} method="POST">
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
                            >Log in</button>
                        </form>
                    </div>

                    <div className='flex flex-col justify-center items-center w-full p-4 bg-white rounded border border-gray-primary'>
                        <p className='text-sm'>
                            Don't have an account? {` `}
                            <Link to={ROUTES.SIGN_UP} className='font-bold text-blue-medium'>Sign up</Link>
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

export default Login;
