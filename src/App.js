import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loader from './components/Loader/loader.component';
import * as ROUTES from './constants/routes';
import useAuthListener from './hooks/use-auth-listener';
import UserContext from './contexts/userContext';
import './styles/app.css';

const Login = lazy(() => import('./pages/login'));
const Signup = lazy(() => import('./pages/signup'));
const NotFound = lazy(() => import('./pages/not-found'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute/ProtectedRoute.component'));
const IsUserLoggedIn = lazy(() => import('./components/IsUserLoggedIn/IsUserLoggedIn.component'));
const Profile = lazy(() => import('./pages/profile'));

const App = () => {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{user}}>
      <Router>
        <Suspense fallback={<Loader />}>
          <Switch>
            <ProtectedRoute exact path={ROUTES.DASHBOARD} user={user} component={Dashboard}/>
            <IsUserLoggedIn path={ROUTES.LOGIN} user={user} component={Login}/>
            <IsUserLoggedIn path={ROUTES.SIGN_UP} user={user}  component={Signup}/>
            <ProtectedRoute path={ROUTES.PROFILE} user={user} component={Profile}/>
            <Route component={NotFound}/>
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

// Client side rendered app react(cra)
  // -> connect to our database - Firebase
  // -> react-loading-skeleton
  // -> using tailwind css
  
// Architecture (Folder structure)
  // src 
    // -> components, 
    // -> constants, 
    // -> contexts, 
    // -> helpers, 
    // -> pages
    // -> lib(firebase staying here), 
    // -> services(firebase functions)
    // -> styles (tailwind - app/tailwind)

/*
  => To-Do:
     Fix the liked by ... and others
     Do the Modal for posts and probably modal page
     Close modal by clicking outside
*/ 