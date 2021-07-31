import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import Footer from '../footer.component';

const ProfileFooter = ({ photos }) => {
    return (
        <div className='h-16 border-t border-gray-primary mt-12 pt-4'>
            <div className="grid grid-cols-3 gap-8 mt-4 mb-12">
                {!photos ? (
                    <div className='relative group cursor-pointer'>
                        <Skeleton count={12} width={320} height={300}/>
                    </div>
                ) : photos.length > 0 ? (
                    photos.map(photo => (
                        <div key={photo.docId} className='relative group cursor-pointer' style={{minHeight: '300px', minWidth: '300px'}}>
                            <img src={photo.imageSrc} alt={photo.caption} className='w-full h-full object-cover'/>
                        </div>
                    ))
                ) : (
                    <div className='col-span-3 pt-24 mx-auto'>
                        <div className='flex items-center justify-center w-16 h-16 rounded-full border border-black-dark mx-auto'>
                            <i className="fas fa-camera text-2xl"></i>
                        </div>
                        <p className='py-5 font-light text-3xl text-center mx-auto'>No Posts Yet</p>
                    </div>
                )}
            </div>
            
            <Footer />
        </div>
    );
}

ProfileFooter.propTypes = {
    photos: PropTypes.array.isRequired,
}

export default ProfileFooter;
