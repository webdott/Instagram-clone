import { useEffect } from 'react';
import Header from '../components/header.component';
import Sidebar from '../components/sidebar/sidebar.component';
import Timeline from '../components/timeline.component';

const Dashboard = () => {

    useEffect(() => {
        document.title = 'Instagram-clone';
    }, []);

    return (
        <div className='bg-gray-background'>
            <Header />
            <div className="grid grid-cols-3 gap-4 justify-between container mx-auto 2md:h-screen 2md:max-h-screen max-w-screen-lg px-5">
                <Timeline />
                <Sidebar />
            </div>
        </div>
    ); 
}

export default Dashboard;
