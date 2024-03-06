import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';
import ServiceList from './service-list/service-list';
import ServiceFilter from './service-filter/service-filter';

const ServicesRoutes = () => {
  const all_services_routes = [
    {
      path: '/service-filter',
      name: 'service-filter',
      element: <ServiceFilter />,
      route: Route,
    },
    {
      path: '/service-list',
      name: 'ServiceList',
      element: <ServiceList />,
      route: Route,
    },
    {
      path: '*',
      name: 'NotFound',
      element: <Navigate to="/" />,
      route: Route,
    },
  ];
  return (
    <>
      <Routes>
        <Route>
          {all_services_routes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
      </Routes>
    </>
  );
};

export default ServicesRoutes;
