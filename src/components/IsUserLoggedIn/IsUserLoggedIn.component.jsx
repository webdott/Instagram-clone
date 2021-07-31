import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const IsUserLoggedIn = ({ component: Component, user, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => (
                user === null 
                    ? <Component {...props}/> 
                    : <Redirect to={{
                        pathname: ROUTES.DASHBOARD, 
                        state: {from: props.location}
                      }}/>
            )}
        />
    ); 
}

IsUserLoggedIn.propTypes = {
    user: PropTypes.object,
    component: PropTypes.object.isRequired,
}

export default IsUserLoggedIn;
