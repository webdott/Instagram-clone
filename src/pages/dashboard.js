import { useEffect } from 'react';
import Header from '../components/header.component';
import Sidebar from '../components/sidebar/sidebar.component';
import Timeline from '../components/timeline.component';

const Dashboard = () => {

    useEffect(() => {
        document.title = 'Instagram';
    }, []);

    return (
        <div className='bg-gray-background'>
            <Header />
            <div className="grid grid-cols-3 gap-4 justify-between container mx-auto h-full max-w-screen-lg px-5">
                <Timeline />
                <Sidebar />
            </div>
        </div>
    ); 
}

export default Dashboard;
