import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const ProtectedRoute = ({ component: Component, user, ...rest }) => {

    return (
        <Route
            {...rest}
            render={(props) => (
                user !== null 
                    ? <Component {...props}/> 
                    : <Redirect to={{
                        pathname: ROUTES.LOGIN, 
                        state: {from: props.location}
                      }}/>
            )}
        />
    ); 
}

ProtectedRoute.propTypes = {
    user: PropTypes.object,
    component: PropTypes.object.isRequired,
}

export default ProtectedRoute;
