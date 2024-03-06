import React from 'react';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../../../core/img/ImageWithBasePath';
import { all_routes } from '../../../../core/data/routes/all_routes';
import * as Icon from 'react-feather';

const Error500 = () => {
  const routes = all_routes;
  return (
    <>
      <>
        {/* Error 500 */}
        <div className="main-wrapper error-page">
          <div className="bg-img">
            <ImageWithBasePath
              src="assets/img/bg/work-bg-03.png"
              alt="img"
              className="bgimg1"
            />
            <ImageWithBasePath
              src="assets/img/bg/work-bg-03.png"
              alt="img"
              className="bgimg2"
            />
            <ImageWithBasePath
              src="assets/img/bg/feature-bg-03.png"
              alt="img"
              className="bgimg3"
            />
          </div>
          <div className="content">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 mx-auto">
                  <div className="error-wrap text-center">
                    <div className="error-logo">
                      <Link to={routes.homeOne}>
                        <ImageWithBasePath
                          className="img-fluid"
                          src="assets/img/logo.svg"
                          alt="img"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5 mx-auto">
                  <div className="error-wrap">
                    <div className="error-img">
                      <ImageWithBasePath
                        className="img-fluid"
                        src="assets/img/error-500.png"
                        alt="img"
                      />
                    </div>
                    <h2>500 Oops! Page Not Found</h2>
                    <p>
                      Sorry, the page you’re looking for doesn’t exist. If you
                      think something is broken, report a problem.
                    </p>
                    <Link to={routes.homeOne} className="btn btn-primary">
                      <Icon.ArrowLeftCircle className="react-feather-custom" />
                      Back to Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Error 500 */}
      </>
    </>
  );
};

export default Error500;
