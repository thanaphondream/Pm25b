import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Hom_P from './PM_25/Hom_P';
import Header from './PM_25/Header';
import Pm25 from './PM_25/Pm25';
import Sidebar from './PM_25/sidebar';
import LocationComponent from './PM_25/LocationComponent';
import IssanMap from './PM_25/IssanMap';

const Layout = () => (
  <>
    <Sidebar />
    <Outlet /> 
  </>
);

const publicRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Hom_P /> },
      ,
  {
    path: '/pm',
    element: <Pm25/>
  },
  {
    path: '/location',
    element: <LocationComponent/>
  },{
    path: '/issanmap',
    element: <IssanMap/>
  }
    ],
  }
]);


export default function App() {
  const isLoggedIn = false; 

  return (
    <RouterProvider router={publicRouter} />
  );
}
