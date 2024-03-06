import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { all_routes } from '../../../../core/data/routes/all_routes';
import ProviderAuthHeader from './common/header1';

const ProviderRules = () => {
  const routes = all_routes;
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  return (
    <>
      <ProviderAuthHeader />
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title">Service Provider Rules</h2>
            </div>
          </div>
        </div>
      </div>
      {/* /Breadcrumb */}
      <div className="content">
        <div className="container">
          <div className="row">
            {/* Terms & Conditions */}
            <div className="col-md-12">
              <div className="terms-content">
                <h6>RULE 1 - QUALITY OF SERVICE </h6>
                <p>
                  Maintain high standards of service quality, including
                  professional conduct, timely communication, and careful
                  handling of customers belongings.
                </p>
                <h6>RULE 2 - RESPECT FOR CUSTOMERS</h6>
                <p>
                  Treat customers with respect and courtesy, addressing their
                  needs and concerns in a professional manner. Always be on time
                  or notify customers of any delays as soon as possible.
                  Complaints may result in termination of your services.
                </p>
                <h6>RULE 3 - TIMELY UPDATES</h6>
                <p>
                  Keep the platform updated with accurate information about your
                  services, including any changes in pricing, availability and
                  documents.
                </p>
                <h6>RULE 4 - FEEDBACK AND REVIEWS</h6>
                <p>
                  Encourage customers to provide feedback and reviews about
                  their experience with your services to secure more jobs. Any 3
                  star reviews or below may result in termination of your
                  services.
                </p>
                <h6>RULE 5 - CANCELLATIONS</h6>
                <p>
                  Drivers must notify of a cancellation immediately, by
                  cancelling the job via dashboard and provide a detailed reason
                  and any relevant documentation to support their claim. The job
                  will be offered to all drivers in the ‘Available Jobs’
                  section, uncovered jobs may result in termination of your
                  services.
                </p>
                <h6>RULE 6 - REPEATED CANCELLATIONS</h6>
                <p>
                  Drivers who demonstrate a pattern of frequent cancellations
                  without valid reasons may result in termination of your
                  services.
                </p>
                <h6>RULE 7 - OUTSOURCING JOBS</h6>
                <p>
                  It is prohibited to outsource jobs obtained from the platform,
                  the job must be covered by the original driver. If that is not
                  possible, then the driver must cancel the job, so it can be
                  covered by a vetted driver through ‘Available Jobs’. If you
                  cancel a job and it is accepted by a driver registered to you,
                  then it will not count as a cancellation.
                </p>
                <div className="terms-btn">
                  <Link to={routes.providerVerification} className="btn btn-primary">
                    I agree with the rules
                  </Link>
                </div>
              </div>
            </div>
            {/* /Terms & Conditions */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProviderRules;
