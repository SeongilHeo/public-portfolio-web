import React from 'react';

const Home = React.lazy(() => import('@/pages/Home'));
const Project = React.lazy(() => import('@/pages/Project'));
const ProjectView = React.lazy(() => import('@/pages/ProjectView'));
const Education = React.lazy(() => import('@/pages/Education'));
const Experience = React.lazy(() => import('@/pages/Experience'));
const Publication = React.lazy(() => import('@/pages/Publication'));
const Teaching = React.lazy(() => import('@/pages/Teaching'));
const CV = React.lazy(() => import('@/pages/CV'));
const News = React.lazy(() => import('@/pages/News'));


export const routes = [
  { path: '/', element: Home },
  { path: '/project', element: Project, title: "Project" },
  { path: '/project/:key', element: ProjectView },
  { path: '/education', element: Education,title: "Education" },
  { path: '/experience', element: Experience,title: "Experience" },
  { path: '/publication', element: Publication,title: "Publication" },
  { path: '/teaching', element: Teaching,title: "Teaching" },
  { path: '/cv', element: CV,title: "CV" },
  { path: '/news', element: News,title: "News" },
];