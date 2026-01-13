import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { mockPins } from './mockData';

const Feed = () => {
    const navigate = useNavigate();

    // PROTECTION LOGIC: If no token, kick user to login immediately
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            navigate("/"); 
        }
    }, [navigate]);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            
            // CORRECT AXIOS CALL: post(url, body, config)
            await axios.post('http://localhost:5000/api/v1/users/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error("Logout failed on server, but clearing local session anyway.");
        } finally {
            // Always clear storage and redirect regardless of server error
            localStorage.removeItem("accessToken");
            navigate("/"); 
        }
    };

    return (
        <div className="bg-white min-h-screen">
            {/* STICKY NAVBAR: Pinterest nav stays at the top */}
            <nav className='flex justify-between items-center p-4 sticky top-0 bg-white z-50 shadow-sm'>
                <div className="flex items-center gap-2">
                    <div className="bg-red-600 p-2 rounded-full">
                         {/* Logo Placeholder */}
                         <div className="w-5 h-5 bg-white rounded-full"></div>
                    </div>
                    <h1 className="font-bold text-xl hidden md:block">Pinterest Clone</h1>
                </div>
                
                <div className="flex-1 max-w-2xl px-4">
                    <input 
                        type="text" 
                        placeholder="Search for ideas..." 
                        className="w-full bg-gray-100 p-2 rounded-full px-6 outline-none focus:ring-2 ring-gray-200"
                    />
                </div>

                <div>
                    <button 
                        onClick={handleLogout}
                        className="bg-gray-200 hover:bg-gray-300 text-black font-semibold px-4 py-2 rounded-full transition"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* FEED CONTENT */}
            <div className="p-4">
                <div className="columns-2 gap-4 space-y-4 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6">
                    {mockPins.map((pin) => (
                        <div 
                            key={pin.id} 
                            className="relative group break-inside-avoid cursor-zoom-in overflow-hidden rounded-2xl"
                        >
                            <img 
                                src={pin.imageUrl} 
                                alt={pin.title} 
                                className="w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                            />

                            {/* HOVER OVERLAY */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
                                <div className="flex justify-end">
                                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 rounded-full text-sm active:scale-90 transition">
                                        Save
                                    </button>
                                </div>

                                <div className="flex items-center justify-between text-white">
                                    <span className="truncate w-32 font-medium text-sm drop-shadow-lg">
                                        {pin.title}
                                    </span>
                                    <div className="bg-white/90 p-2 rounded-full text-black hover:bg-white transition cursor-pointer">
                                        <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M...Z"/> {/* Share Icon */}
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Feed;