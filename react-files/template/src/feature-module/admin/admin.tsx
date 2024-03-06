import React, { useEffect, useState } from 'react';
import AdminRoutes from './admin.routes';
import AdminHeader from './common/header';
import AdminSidebar from './common/sidebar';
import { useLocation } from 'react-router-dom';
import PageLoader from '../../core/loader';

const Admin = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, [location.pathname]);

  useEffect(() => {
    const delay = 2000;
    setTimeout(() => {
      setIsLoading(false);
    }, delay);
  }, [location.pathname]);
  return (
    <>
      {isLoading && <PageLoader />}
      {!isLoading && (
        <>
          {location.pathname == '/admin/signin' ||
          location.pathname == '/admin/signup' ||
          location.pathname == '/admin/forget-password' ||
          location.pathname == '/admin/wallet-history' ? (
            <></>
          ) : (
            <>
              <AdminHeader />
              <AdminSidebar />
            </>
          )}
          <AdminRoutes />
        </>
      )}
    </>
  );
};

export default Admin;
