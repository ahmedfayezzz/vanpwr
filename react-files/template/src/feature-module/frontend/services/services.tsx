import React from 'react';
import ServicesRoutes from './services.routes';
import FooterOne from '../home/home-one/footer-one';
import HomeHeader from '../home/header/home-header';

const Services = () => {
  return (
    <>
      <HomeHeader type={1} />
      <ServicesRoutes />
      <FooterOne />
    </>
  );
};

export default Services;
