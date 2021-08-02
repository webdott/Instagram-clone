import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/use-photos';
import Post from './post/post.component';

const Timeline = () => {
    const { photos } = usePhotos();

    return (
        <div className='timeline container max-w-custom-sm col-span-3 2md:col-span-2 pt-20 h-screen max-h-screen mx-auto overflow-y-auto'>
            {!photos ? (
                [...new Array(4)].map((_, idx) => (
                    <div className='mb-4' key={idx} style={{width:'98%'}}>
                        <Skeleton count={1} height={600}/>
                    </div>
                ))
            ): photos?.length > 0 ? (
                photos.map(content => <Post key={content.docId} content={content} />)
            ): (
                <p className='text-center text-2xl'>Follow people to see photos</p>
            )}
        </div>
    );
}

export default Timeline;
