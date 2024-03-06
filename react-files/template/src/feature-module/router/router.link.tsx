import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { all_routes } from '../../core/data/routes/all_routes';
import HomeFive from '../frontend/home/home-five/home-five';
import HomeFour from '../frontend/home/home-four/home-four';
import HomeOne from '../frontend/home/home-one/home-one';
import HomeSeven from '../frontend/home/home-seven/home-seven';
import HomeThree from '../frontend/home/home-three/home-three';
import HomeTwo from '../frontend/home/home-two/home-two';
import Pages from '../frontend/pages/pages';
import Customers from '../frontend/customers/customers';
import Services from '../frontend/services/services';
import Blog from '../frontend/blog/blog';
import Providers from '../frontend/providers/providers';

import LoginPhone1 from '../frontend/pages/authentication/login-phone1';
import Booking2 from '../frontend/pages/booking/booking-2';


import PhoneOtp from '../frontend/pages/authentication/phone-otp';
import HomeSix from '../frontend/home/home-six';
import HomeEight from '../frontend/home/home-eight';
import HomeNine from '../frontend/home/home-nine';
import Admin from '../admin/admin';
import Booking1 from '../frontend/pages/booking/booking-1';
import BookingDetails from '../frontend/pages/booking/booking-details';
import BookingDone from '../frontend/pages/booking/booking-done';
import BookingPayment from '../frontend/pages/booking/booking-payment';
import ChooseSignup from '../frontend/pages/authentication/choose-signup';
import Error404 from '../frontend/pages/Error page/error404';
import UserSignup from '../frontend/pages/authentication/user-signup';
import EmailOtp from '../frontend/pages/authentication/email-otp';
import Login from '../frontend/pages/authentication/login';

import PaymentSetting from '../frontend/providers/settings/payment-setting';
import ResetPassword from '../frontend/pages/authentication/reset-password';
import PasswordRecovery from '../frontend/pages/authentication/password-recovery';
import Success from '../frontend/pages/authentication/success';
import FreeTrail from '../frontend/pages/authentication/free-trail';
const routes = all_routes;

const publicRoutes = [
  {
    path: routes.homeOne,
    name: 'home-one',
    element: <HomeOne />,
    route: Route,
  },
  {
    path: '/',
    name: 'Root',
    element: <Navigate to="/home-one" />,
    route: Route,
  },
  {
    path: '*',
    name: 'NotFound',
    element: <Navigate to="/home-one" />,
    route: Route,
  },

  // pages module's path
  {
    path: routes.booking1,
    name: 'booking-1',
    element: <Booking1 />,
    route: Route,
  },

  {
    path: routes.bookingDone,
    name: 'booking-done',
    element: <BookingDone />,
    route: Route,
  },

  {
    path: routes.error404,
    name: 'error404',
    element: <Error404 />,
    route: Route,
  },
  {
    path: routes.error500,
    name: 'error404',
    element: <Error404 />,
    route: Route,
  },

  // provider module's path


  //customer module's path

  // blog module's path
  // service path

  {
    path: routes.pages,
    name: 'pages',
    element: <Pages />,
    route: Route,
  },
  {
    path: routes.services,
    name: 'services',
    element: <Services />,
    route: Route,
  },
  {
    path: routes.providers,
    name: 'providers',
    element: <Providers />,
    route: Route,
  },
  {
    path: '/authentication/reset-password',
    name: 'reset-password',
    element: <ResetPassword />,
    route: Route,
  },
  {
    path: '/authentication/password-recovery',
    name: 'password-recovery',
    element: <PasswordRecovery />,
    route: Route,
  },
  
  {
    path: '/authentication/login',
    name: 'login',
    element: <Login/>,
    route: Route,
  },
  {
    path: '/authentication/email-otp',
    name: 'email-Otp',
    element: <EmailOtp/>,
    route: Route,
  },
  {
    path: '/authentication/choose-signup',
    name: 'choose-signup',
    element: <ChooseSignup/>,
    route: Route,
  },
  {
    path: '/authentication/success',
    name: 'success',
    element: <Success />,
    route: Route,
  },

  // Admin Module Path
  
  // {
  //   path: routes.admin,
  //   name: 'admin',
  //   element: <Admin />,
  //   route: Route,
  // },
  // {
  //   path: 'admin',
  //   name: 'Root',
  //   element: <Navigate to="/admin/dashboard" />,
  //   route: Route,
  // },
];

export { publicRoutes };
