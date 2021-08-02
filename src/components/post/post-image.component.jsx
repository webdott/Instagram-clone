import PropTypes from 'prop-types';

const PostImage = ({ src, caption }) => {
    return (
        <div className="w-full custom-sm:min-h-picture">
            <img src={src} alt={caption} className='custom-sm:min-h-picture object-cover'/>
        </div>
    );
}

PostImage.propTypes = {
    src: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
}

export default PostImage;
