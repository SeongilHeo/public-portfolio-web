import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { Spinner } from '@/components';
import { Layout } from '@/layout';
import { routes } from '@/routes'
import PageNotFound from '@/pages/PageNotFound';
import { initGA, trackPage } from '@/analytics';

const AnalyticsTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    const path = location.pathname.split('/')[1];
    const matchedRoute = routes.find(r => r.path === `/${path}`);
    const title = matchedRoute?.title ? `${matchedRoute.title} | Seongil Heo` : 'Seongil Heo';
    document.title = title;
    trackPage(path, title);
  }, [location]);
  return null;
};

const App = () => {
  return (
    <Router>
      {/* <AnalyticsTracker /> */}
      <Suspense fallback={
        <div className="h-screen w-screen flex items-center justify-center">
          <Spinner />
        </div>
        }>
        <Routes>
          <Route element={<Layout />}>
            {routes.map(({ path, element: Element }, index) => (
              <Route
                key={`main-${index}`}
                path={path}
                element={<Element />} />
            ))}
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
