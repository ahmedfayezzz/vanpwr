import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import ImageWithBasePath from '../../../../core/img/ImageWithBasePath';
import { Link, useNavigate } from 'react-router-dom';
import { all_routes } from '../../../../core/data/routes/all_routes';
import axios from 'axios';

const ProviderSecuritySettings = () => {
  const routes = all_routes;
  const user_id = sessionStorage.getItem('user_id');
  const access_token = sessionStorage.getItem('access_token');
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://wgjgzlvwmoavtpeylund.supabase.co/rest/v1/driver?select=*',
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              apikey: process.env.REACT_APP_BEARER_TOKEN,
            },
          },
        );

        setUser(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleServiceDelete = async () => {
    const url = `https://wgjgzlvwmoavtpeylund.supabase.co/rest/v1/driver?id=eq.${user_id}`;
    const headers = {
      Authorization: `Bearer ${access_token}`, // Replace with the actual access token
      apiKey: process.env.REACT_APP_BEARER_TOKEN,
    };

    try {
      const response = await axios.delete(url, { headers });

      sessionStorage.clear();
      navigate(routes.homeOne);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <div className="row">
          <div className="col-md-12">
            {/* Security settings */}
            <div className="widget-title">
              <h4>Security Settings</h4>
            </div>
            <div className="linked-item">
              <div className="linked-wrap">
                <div className="linked-acc">
                  <span className="link-icon">
                    <ImageWithBasePath
                      src="assets/img/icons/lock-icon.svg"
                      alt="Lock"
                    />
                  </span>
                  <div className="linked-info">
                    <h6>Password</h6>
                  </div>
                </div>
                <div className="linked-action">
                  <Link
                    to={routes.passwordRecovery}
                    className="btn btn-secondary btn-set"
                  >
                    Change password
                  </Link>
                </div>
              </div>
            </div>

            <div className="linked-item">
              <div className="linked-wrap">
                <div className="linked-acc">
                  <span className="link-icon">
                    <ImageWithBasePath
                      src="assets/img/icons/monitor-icon.svg"
                      alt="image"
                    />
                  </span>
                  <div className="linked-info">
                    <h6>Delete account</h6>
                  </div>
                </div>
                <div className="linked-action">
                  <Link
                    to="#"
                    className="btn-acc"
                    data-bs-toggle="modal"
                    data-bs-target="#del-service"
                  >
                    <Icon.AlertCircle className="react-feather-icon" /> Delete
                  </Link>
                </div>
              </div>
            </div>

            <div className="linked-item">
              <div className="linked-wrap">
                <div className="linked-acc">
                  <span className="link-icon">
                    <ImageWithBasePath
                      src="assets/img/icons/document-pdf.svg"
                      alt="Lock"
                    />
                  </span>
                  <div className="linked-info">
                    <h6>Account verified</h6>
                  </div>
                </div>
                <div className="linked-action">
                  {user.verified ? <p>Verified</p> : <p>Not Yet Verified</p>}
                </div>
              </div>
            </div>
          </div>
          {/* /Security-settings */}
        </div>
      </div>

      {/* Delete Service */}
      <div className="modal fade custom-modal" id="del-service">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-bottom-0 justify-content-between">
              <h5 className="modal-title">Delete Account</h5>
              <button
                type="button"
                className="close-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="feather-x" />
              </button>
            </div>
            <div className="modal-body pt-0">
              <div className="write-review">
                <form action='/'>
                  <p>Are you sure want to delete this account?</p>
                  <div className="modal-submit text-end">
                    <Link
                      to="#"
                      className="btn btn-secondary me-2"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={handleServiceDelete} // Call the function when the button is clicked
                    >
                      Yes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Delete Service */}
    </div>
  );
};

export default ProviderSecuritySettings;
