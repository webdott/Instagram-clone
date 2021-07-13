import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

const ProfileFooter = ({ photos }) => {
    return (
        <div>
            This is the footer
        </div>
    );
}

ProfileFooter.propTypes = {
    photos: PropTypes.array.isRequired,
}

export default ProfileFooter;
