import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Faq from './faq/faq';
import TermsCondition from './terms-condition/terms-condition';
import ContactUs from './contact-us/contact-us';
import PrivacyPolicy from './privacy-policy/privacy-policy';
import Booking1 from './booking/booking-1';
import SessionExpired from './session-expired/session-expired';
import Error404 from './Error page/error404';
import Error500 from './Error page/error500';
import BookingPayment from './booking/booking-payment';
import BookingDone from './booking/booking-done';

const PagesRoutes = () => {
  const all_pages_routes = [
    {
      path: '/contact-us',
      name: 'contact-us',
      element: <ContactUs />,
      route: Route,
    },
    {
      path: '/faq',
      name: 'faq',
      element: <Faq />,
      route: Route,
    },
    {
      path: '/terms-condition',
      name: 'terms-condition',
      element: <TermsCondition />,
      route: Route,
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      element: <PrivacyPolicy />,
      route: Route,
    },
    {
      path: '/booking/booking-1',
      name: 'booking-1',
      element: <Booking1 />,
      route: Route,
    },
    {
      path: '/booking/booking-done',
      name: 'booking-done',
      element: <BookingDone />,
      route: Route,
    },
    {
      path: '/booking/booking-payment',
      name: 'booking-payment',
      element: <BookingPayment />,
      route: Route,
    },
    {
      path: '/session-expired',
      name: 'SessionExpired',
      element: <SessionExpired />,
      route: Route,
    },
    {
      path: '/error/error-404',
      name: 'Error404',
      element: <Error404 />,
      route: Route,
    },
    {
      path: '/error/error-500',
      name: 'Error500',
      element: <Error500 />,
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
          {all_pages_routes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
      </Routes>
    </>
  );
};

export default PagesRoutes;
