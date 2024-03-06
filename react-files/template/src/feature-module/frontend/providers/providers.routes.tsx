import React from 'react';
import { all_routes } from '../../../core/data/routes/all_routes';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProviderEditService from './provider-edit-service/provider-edit-service';
import ProviderBooking from './provider-booking/provider-booking';
import ProviderSecuritySettings from './settings/provider-security-settings';
import ProviderServices from './provider-service/provider-service';
import ProviderSignup from './authentication/provider-signup';
import ProviderProfileSettings from './settings/provider-profile-settings';
import ProviderRules from './authentication/provider-rules';
import ProviderVerification from './authentication/provider-verification';
import ProviderCreateService from './provider-create-service/provider-create-service';
import ProviderAvailableJobs from './provider-available-jobs/provider-available-jobs';

const ProvidersRoutes = () => {
  const routes = all_routes;
  const all_providers_routes = [
    {
      path: '/provider-create-service',
      name: 'provider-create-service',
      element: <ProviderCreateService />,
      route: Route,
    },
    {
      path: '/provider-edit-service/:serviceId',
      name: 'provider-edit-service',
      element: <ProviderEditService />,
      route: Route,
    },
    {
      path: '/settings/provider-profile-settings',
      name: 'provider-profile-settings',
      element: <ProviderProfileSettings />,
    },
    {
      path: '/provider-booking',
      name: 'provider-booking',
      element: <ProviderBooking />,
      route: Route,
    },
    {
      path: '/provider-available-jobs',
      name: 'provider-available-jobs',
      element: <ProviderAvailableJobs />,
      route: Route,
    },
    {
      path: '/provider-service',
      name: 'provider-service',
      element: <ProviderServices />,
      route: Route,
    },
    {
      path: '/authentication/provider-signup',
      name: 'provider-signup',
      element: <ProviderSignup />,
      route: Route,
    },
    {
      path: '/authentication/provider-rules',
      name: 'provider-rules',
      element: <ProviderRules />,
      route: Route,
    },
    {
      path: '/authentication/provider-verification',
      name: 'provider-verification',
      element: <ProviderVerification />,
      route: Route,
    },
    {
      path: '/settings/provider-security-settings',
      name: 'provider-security-settings',
      element: <ProviderSecuritySettings />,
      route: Route,
    },
    {
      path: routes.providerService,
      name: 'provider-service',
      element: <ProviderServices />,
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
      <>
        <Routes>
          <Route>
            {all_providers_routes.map((route, idx) => (
              <Route path={route.path} element={route.element} key={idx} />
            ))}
          </Route>
        </Routes>
      </>
    </>
  );
};

export default ProvidersRoutes;
