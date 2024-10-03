import Header from '@/Components/Header';
import Sidebar from '@/Components/Sidebar';

export default function Authenticated({ user, children }) {
    return (
        <div className="h-screen bg-white">
            <Header user={user} />
            <div className='flex h-screen overflow-y-auto'>
                <Sidebar />
                <main className='flex-1 overflow-y-auto mt-14 h-100 p-8 sm:ml-56 max-w-8xl sm:px-6 lg:px-8 bg-white'>
                    {children}
                </main>
            </div>
        </div>
    );
}
