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

const App = () => {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{user}}>
      <Router>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path={ROUTES.DASHBOARD} component={Dashboard}/>
            <Route path={ROUTES.LOGIN} component={Login}/>
            <Route path={ROUTES.SIGN_UP} component={Signup}/>
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