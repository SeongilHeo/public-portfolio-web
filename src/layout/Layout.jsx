import React from 'react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, Topbar } from "@/components/";
import { contact } from "@/data";
import { FontAwesomeIcon } from '@/icons';

const Layout = () => {
  const [isSideOpen, setIsSideOpen] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth >= 1280 // xl:
  );

  const email = contact.find(item => item.key === 'email')?.to || '';

  return (
    <div className="flex">
      <Sidebar isOpen={isSideOpen} />
      <main className={`min-h-screen w-screen px-4 md:px-14 lg:px-24 relative ${isSideOpen ? 'xl:ml-80' : 'ml-0'} flex flex-col`} >
        <button
          className={`aspect-square fixed top-4 xl:top-8 z-10 bg-slate-200 px-2 rounded-xl md:bg-transparent ${isSideOpen ? 'left-84 xl:left-88' : 'left-4 xl:left-8'} transition-all duration-300 ease-in-out`}
          onClick={() => setIsSideOpen(prev => !prev)}
        >
          <FontAwesomeIcon icon={['fas', 'bars']} className="text-2xl text-slate-600"/>
        </button>
        <Topbar />
        <Outlet />
        {email && <button
          type="button"
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 p-2 md:p-4 bg-slate-600 hover:bg-slate-800 rounded-full hover:scale-105 transition-all"
          onClick={() => (window.location.href = email)}
        >
          <FontAwesomeIcon icon={['fas', 'envelope']} className="md:text-2xl text-white px-1 sm:px-0" />
        </button>}
      </main>
    </div>
  );
};

export default Layout