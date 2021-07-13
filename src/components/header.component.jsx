import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import FirebaseContext from '../contexts/firebaseContext';
import UserContext from '../contexts/userContext';
import * as ROUTES from '../constants/routes';
import Avatar from 'react-avatar';

const Header = () => {

    const { user } = useContext(UserContext);
    const { firebase } = useContext(FirebaseContext);

    const [isAvatarClicked, setIsAvatarClicked] = useState(false);

    // const [icons, setIcons] = useState({
    //     home: true,
    //     messages: false,
    //     explore: false,
    //     notifications: false
    // }); 

    // window.addEventListener('click', (e) => {
    //     if(
    //         !e.target.classList.contains("avatar") || !e.target.className.includes("sb-avatar__image") 
    //     ) setIsAvatarClicked(false)
    // })

    return (
        <header className='h-16 bg-white border-b border-gray-primary mb-8 fixed top-0 left-0 z-10 w-full'>
            <div className="container mx-auto h-full max-w-screen-lg px-5">
                <div className="flex justify-between h-full">
                    <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
                        <h1 className='flex justify-center w-full'>
                            <Link to={ROUTES.DASHBOARD} aria-label='Instagram logo'>
                                <img src="/images/logo.png" alt="Instagram logo" className='mt-2 w-6/12'/>
                            </Link>
                        </h1>
                    </div>
                    <form className="text-gray-700 text-center flex items-center align-items h-full w-52 hidden md:flex">
                        <input 
                            type="search" 
                            name="email" 
                            id="email"
                            className="header-search w-full text-gray-400 text-sm border border-gray-primary p-2 rounded h-7 bg-gray-200"
                            placeholder=' 🔍 Search '
                        />
                    </form>
                    <div className="text-gray-700 text-center flex items-center align-items h-full">
                        {
                            user ? (
                                <>
                                    <Link to={ROUTES.DASHBOARD} aria-label='Dashboard' className='mr-4'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-7 w-7`} viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                        </svg>
                                    </Link>

                                    <Link to='#' aria-label='Direct' className='mr-4'>
                                        <svg aria-label="Direct"  fill="#262626" height="22" viewBox="0 0 48 48" width="22">
                                            <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
                                        </svg>
                                    </Link>

                                    <Link to='#' aria-label='Compass' className='mr-4'>
                                        <svg aria-label="Find People" fill="#262626" height="22" viewBox="0 0 48 48" width="22">
                                            <path clipRule="evenodd" d="M24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0zm0 45C12.4 45 3 35.6 3 24S12.4 3 24 3s21 9.4 21 21-9.4 21-21 21zm10.2-33.2l-14.8 7c-.3.1-.6.4-.7.7l-7 14.8c-.3.6-.2 1.3.3 1.7.3.3.7.4 1.1.4.2 0 .4 0 .6-.1l14.8-7c.3-.1.6-.4.7-.7l7-14.8c.3-.6.2-1.3-.3-1.7-.4-.5-1.1-.6-1.7-.3zm-7.4 15l-5.5-5.5 10.5-5-5 10.5z" fillRule="evenodd"></path>
                                        </svg>
                                    </Link>
                                    
                                    <Link to='#' aria-label='Likes' className='mr-4'>
                                        <svg aria-label="Activity Feed" fill="#262626" height="22" viewBox="0 0 48 48" width="22">
                                            <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                                        </svg>
                                    </Link>

                                    <div 
                                        className={`avatar relative mr-4 cursor-pointer flex justify-center items-center p-1 ${isAvatarClicked ? 'border border-black-light rounded-full' : ''} w-9 h-9`} 
                                        onClick={() => setIsAvatarClicked((isAvatarClicked) => !isAvatarClicked)}
                                    >
                                        <span className="_2dbep qNELH" role="link" tabIndex="0">
                                            <Avatar email={user.email} name={user.fullName} round={true} size={30}/>
                                        </span>

                                        <div className={`${isAvatarClicked ? '' : 'hidden'} absolute top-12 right-0 w-48 bg-white shadow-md rounded`}>
                                            <ul>
                                                <li
                                                    className='w-full border-b border-gray-primary hover:bg-gray-background'
                                                >
                                                    <Link to={`/u/${user.displayName}`} className='cursor-pointer flex justify-start items-center w-full px-4 py-2 text-sm font-400'>
                                                        <svg 
                                                            className="w-5 h-5 text-black-light mr-2 font-light cursor-pointer"
                                                            aria-label="Profile" 
                                                            fill="#262626"  
                                                            viewBox="0 0 32 32" 
                                                        >
                                                            <path d="M16 0C7.2 0 0 7.1 0 16c0 4.8 2.1 9.1 5.5 12l.3.3C8.5 30.6 12.1 32 16 32s7.5-1.4 10.2-3.7l.3-.3c3.4-3 5.5-7.2 5.5-12 0-8.9-7.2-16-16-16zm0 29c-2.8 0-5.3-.9-7.5-2.4.5-.9.9-1.3 1.4-1.8.7-.5 1.5-.8 2.4-.8h7.2c.9 0 1.7.3 2.4.8.5.4.9.8 1.4 1.8-2 1.5-4.5 2.4-7.3 2.4zm9.7-4.4c-.5-.9-1.1-1.5-1.9-2.1-1.2-.9-2.7-1.4-4.2-1.4h-7.2c-1.5 0-3 .5-4.2 1.4-.8.6-1.4 1.2-1.9 2.1C4.2 22.3 3 19.3 3 16 3 8.8 8.8 3 16 3s13 5.8 13 13c0 3.3-1.2 6.3-3.3 8.6zM16 5.7c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 11c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"></path>
                                                        </svg>
                                                        Profile
                                                    </Link>
                                                </li>
                                                <li
                                                    className='cursor-pointer flex justify-start items-center w-full px-4 py-4 text-sm font-400 hover:bg-gray-background'
                                                    onClick={() => firebase.auth().signOut()}
                                                    onKeyDown={(e) => {
                                                        if(e.key === 'Enter'){
                                                            firebase.auth().signOut();
                                                        }
                                                    }}
                                                >
                                                    <svg
                                                        className="w-5 h-5 text-black-light mr-2 font-light cursor-pointer"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                        />
                                                    </svg>
                                                    Log Out
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link to={ROUTES.LOGIN}>
                                        <button 
                                            type='button'
                                            className='bg-blue-medium font-bold text-sm text-white rounded w-20 h-8 flex justify-center items-center mr-2'
                                        >
                                            Log In
                                        </button>
                                    </Link>

                                    <Link to={ROUTES.SIGN_UP}>
                                        <button 
                                            type='button'
                                            className='text-blue-medium font-bold text-sm text-white rounded w-20 h-8 flex justify-center items-center'
                                        >
                                            Sign Up
                                        </button>
                                    </Link>
                                </>
                            )   
                        }
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
