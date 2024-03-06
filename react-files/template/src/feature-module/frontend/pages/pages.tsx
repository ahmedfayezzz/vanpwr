import React from 'react';
import FooterOne from '../home/home-one/footer-one';
import PagesRoutes from './pages.routes';
import { useLocation } from 'react-router-dom';
import HomeHeader from '../home/header/home-header';

const Pages = () => {
  const location = useLocation();
  return (
    <>
      {location?.pathname == '/authentication/reset-password' ||
      location?.pathname === '/authentication/login' ||
      location?.pathname === '/authentication/email-otp' ||
      location?.pathname === '/authentication/password-recovery' ||
      location?.pathname === '/authentication/password-recovery' ||
      location?.pathname === '/authentication/choose-signup' ||
      location?.pathname === '/pages/session-expired' ? (
        <></>
      ) : (
        <HomeHeader type={1} />
      )}
      <PagesRoutes />
      {location?.pathname == '/pages/session-expired' ? <></> : <FooterOne />}
    </>
  );
};

export default Pages;
