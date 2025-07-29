import { useEffect, useState } from 'react';

export default function useTableOfContents() {
  const [toc, setToc] = useState([]);

  useEffect(() => {
    const container = document.getElementById('md-content');
    const selector = 'h1, h2, h3';
    const nodes = Array.from(
      container && container.querySelectorAll(selector)
    );
    const items = nodes.map(node => ({
      id: node.id,
      text: node.textContent,
      level: Number(node.tagName[1]),  // 'H2' → 2
    }));
    setToc(items);
  }, []);

  return toc;
}



