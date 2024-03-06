import React, { useEffect, useState } from 'react';
import ProviderHeader from './common/header';
import ProviderSidebar from './common/sidebar';
import ProvidersRoutes from './providers.routes';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLoader from '../../../core/loader';
import { all_routes } from '../../../core/data/routes/all_routes';
import axios from 'axios';

const Providers = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const routes = all_routes;
  const [isLoading, setIsLoading] = useState(false);
  const [formComplete, setFormComplete] = useState(false);
  const access_token = sessionStorage.getItem('access_token');


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://wgjgzlvwmoavtpeylund.supabase.co/rest/v1/driver?select=*',
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              apiKey: process.env.REACT_APP_BEARER_TOKEN,
            },
          },
        );

        const service = response.data[0];

        // Check if service is undefined before accessing service.form_complete
        if (service) {
          // Update the state variables with the service details
          setFormComplete(service.form_complete);

          // Redirect the user based on the formComplete state
          const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
          if (!isLoggedIn) {
            navigate(routes.sessionExpired);
          } else if (!service.form_complete) {
            navigate(routes.providerVerification);
          }
        } else {
          navigate(routes.providerVerification);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);



  useEffect(() => {
    setIsLoading(true);
  }, [location.pathname]);

  useEffect(() => {
    const delay = 2000;
    setTimeout(() => {
      setIsLoading(false);
    }, delay);
  }, [location.pathname]);


  useEffect(() => {
    const checkTokenValidity = () => {
      const expiresAt = Number(sessionStorage.getItem('expires_at')); // Convert to number
      if (expiresAt) {
        const currentTime = Math.floor(Date.now() / 1000); // Convert to Unix timestamp
        if (currentTime >= expiresAt) {
          // The token has expired, update isLoggedIn
          sessionStorage.setItem('isLoggedIn', 'false');

          // Redirect the user to the session expired page
          navigate(routes.sessionExpired);
        }
      }
    };

    // Check token validity immediately and then every minute
    checkTokenValidity();
    const intervalId = setInterval(checkTokenValidity, 60 * 1000);

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {isLoading && <PageLoader />}
      {!isLoading && (
        <>
          {location?.pathname == '/providers/authentication/provider-signup' ||
          location?.pathname == '/providers/authentication/provider-rules' ||
          location?.pathname ==
            '/providers/authentication/provider-verification' ? (
            <></>
          ) : (
            <ProviderHeader />
          )}
          {location?.pathname == '/providers/authentication/provider-signup' ||
          location?.pathname == '/providers/authentication/provider-rules' ||
          location?.pathname ==
            '/providers/authentication/provider-verification' ? (
            <></>
          ) : (
            <ProviderSidebar />
          )}

          <ProvidersRoutes />
        </>
      )}
    </>
  );
};

export default Providers;