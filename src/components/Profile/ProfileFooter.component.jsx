import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import Footer from '../footer.component';
import PostModal from '../post/post-modal.component';

const ProfileFooter = ({ photos }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [content, setContent] = useState({});

    return (
        <div className='h-16 border-t border-gray-primary mt-12 pt-4'>
            <div className="grid grid-cols-3 gap-2 sm:gap-6 mt-4 mb-12">
                {!photos ? (
                    <div className='relative group cursor-pointer'>
                        <Skeleton count={12} width={320} height={300}/>
                    </div>
                ) : photos.length > 0 ? (
                    photos.map(photo => (
                        <div 
                            key={photo.docId} 
                            onClick={() => {
                                setModalOpen(true);
                                setContent(photo);
                            }}
                            className='relative group cursor-pointer w-100 h-100 extra-sm:w-100 extra-sm:h-100 custom-sm:w-170 
                                custom-sm:h-170 sm:w-200 sm:h-200 md:h-230 md:w-230 2md:w-300 2md:h-300'
                        >
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

            {modalOpen && 
                <PostModal 
                    postContent={content}
                    closePostModal={() => setModalOpen(false)}
                />
            }
        </div>
    );
}

ProfileFooter.propTypes = {
    photos: PropTypes.array.isRequired,
}

export default ProfileFooter;
