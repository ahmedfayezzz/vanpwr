import React from 'react';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../../../core/img/ImageWithBasePath';
import { all_routes } from '../../../../core/data/routes/all_routes';
import PagesAuthHeader from './common/header';

const Success = () => {
  const routes = all_routes;
  return (
    <>
      <PagesAuthHeader />

      <div className="content">
        <div className="container">
          <div className="row">
            {/* Password Success */}
            <div className="col-md-6 col-lg-6 mx-auto">
              <div className="login-wrap">
                <div className="otp-img">
                  <ImageWithBasePath
                    src="assets/img/icons/tick-circle.svg"
                    alt="Tick"
                  />
                </div>
                <div className="login-header">
                  <div className="log-form">
                    <h3>Success</h3>
                    <p>Your new password has been Successfully saved</p>
                  </div>
                </div>
                <form action={routes.login}>
                  <Link
                    to={routes.login}
                    className="btn btn-primary w-100 login-btn"
                    type="submit"
                  >
                    Proceed to login
                  </Link>
                </form>
              </div>
            </div>
            {/* /Password Success */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Success;
