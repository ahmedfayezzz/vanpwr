import React from 'react';
import { publicRoutes } from './router.link';
import { Route, Routes } from 'react-router-dom';

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route>
          {publicRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
      </Routes>
    </>
  );
};
export default AllRoutes;
