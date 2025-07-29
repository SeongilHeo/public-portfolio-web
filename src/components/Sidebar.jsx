import React from 'react';
import { contact } from '@/data';
import { FontAwesomeIcon } from '@/icons'
import { navigation } from '@/routes/navigation';
import { useLocation } from 'react-router-dom';

function formatBuildDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
}

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  return (
    <aside className={`${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="flex flex-col gap-6">
        {/* Menu */}
        <section>
          <h4 className="border-strong pb-2 px-1 mb-8 border-b-3 w-fit">Menu</h4>
          <ul>
            {navigation.map(item => (
              <li key={item.key} className="mb-4">
                {(() => {
                  const isActive = location.pathname === item.to;
                  return (
                    <a
                      href={item.to}
                      className={`px-2 pb-2 ${isActive
                          ? "text-blue-500 font-semibold"
                          : "text-black hover:text-slate-500"
                      } flex gap-2 items-center`}
                    >
                      <FontAwesomeIcon icon={item.icon} />
                      {item.title}
                    </a>
                  );
                })()}
              </li>
            ))}
          </ul>
        </section>
        {/* Contact */}
        <section>
          <h4 className="border-strong pb-2 px-1 mb-8 border-b-3 w-fit">Contact</h4>
          <ul>
            {contact.map(item => (
              <li key={item.key} className="mb-4 w-fit">
                <a href={item.to} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 pb-1">
                  <FontAwesomeIcon icon={item.icon} />
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
      {/* footer */}
      <footer className="text-sm text-slate-500">
        <p className="py-8">Last Updated: {formatBuildDate(__BUILD_DATE__)}. <br /> © 2025 Seongil Heo. </p>
      </footer>
    </aside>
  );
};

export default Sidebar;