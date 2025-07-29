import React, { useState } from 'react';
import useTableOfContents from '@/hooks/useTableOfContents';

export default function TableOfContents() {
  const toc = useTableOfContents();
  const [activeId, setActiveId] = useState(null);

  return (
    <div className="toc fixed top-1/4 right-0 hidden xl:block w-1/6 overflow-auto text-sm p-2">
      <p className="text-nowrap"><strong>{document.title}</strong></p>
      <ul className="space-y-2 mt-2 py-2 border-l-4 ml-2">
        {toc.map(item => (
          <li
            key={item.id}
            style={{ marginLeft: (item.level - 1) * 16 }}
            className="text-nowrap"
          >
            <a
              href={`#${item.id}`}
              onClick={e => {
                e.preventDefault();
                setActiveId(item.id);
                const el = document.getElementById(item.id);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                  window.history.pushState(null, '', `#${item.id}`);
                }
              }}
              className={`transition-all duration-300 ${activeId === item.id ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'}`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}