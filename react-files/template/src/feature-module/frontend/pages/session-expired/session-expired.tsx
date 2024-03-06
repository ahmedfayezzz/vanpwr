import React from 'react'
import { Link } from 'react-router-dom'
import ImageWithBasePath from '../../../../core/img/ImageWithBasePath'
import { all_routes } from '../../../../core/data/routes/all_routes';
import * as Icon from 'react-feather'

const SessionExpired = () => {
  const routes = all_routes;
  return (
    <>
      <>
  {/* Session Expired */}
  <div className="main-wrapper error-page">
    <div className="bg-img">
      <ImageWithBasePath src="assets/img/bg/work-bg-03.png" alt="img" className="bgimg1" />
      <ImageWithBasePath src="assets/img/bg/work-bg-03.png" alt="img" className="bgimg2" />
      <ImageWithBasePath src="assets/img/bg/feature-bg-03.png" alt="img" className="bgimg3" />
    </div>
    <div className="content">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
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
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="error-wrap">
              <h2>Your Session has expired</h2>
              <p>
                Please refresh the page. Do not worry, we kept all of you filters
                and breakdowns in place.
              </p>
              <Link to={routes.homeOne} className="btn btn-primary">
                <Icon.ArrowLeftCircle className="react-feather-custom" />
                Back to Home
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="error-wrap">
              <div className="error-img">
                <ImageWithBasePath
                  className="img-fluid"
                  src="assets/img/session.png"
                  alt="img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Session Expired */}
</>

    </>
  )
}

export default SessionExpired
