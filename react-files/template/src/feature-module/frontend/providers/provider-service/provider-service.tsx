import React, { useState, useEffect } from 'react';
import * as Icon from 'react-feather';
import ImageWithBasePath from '../../../../core/img/ImageWithBasePath';
import { Link } from 'react-router-dom';
import { all_routes } from '../../../../core/data/routes/all_routes';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';
import { Modal } from 'bootstrap';

const routes = all_routes;

const ProviderServices = () => {
  const access_token = sessionStorage.getItem('access_token');
  const user_id = sessionStorage.getItem('user_id');

  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);

  useEffect(() => {
    const params = {
      driver_id: user_id,
    };

    const loadingModalElement = document.getElementById('loadingModal');
    const loadingModal = new Modal(loadingModalElement);
    loadingModal.show();

    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://wgjgzlvwmoavtpeylund.supabase.co/functions/v1/get-services',
          params,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          },
        );

        if (response.data && response.data.length > 0) {
          setServices(response.data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();

    // Manually stop the loading modal after 5 seconds
    setTimeout(() => {
      loadingModal.hide();
    }, 5000);
  }, []);

  const handleServiceStatusChange = async (isActive) => {
    const url = `https://wgjgzlvwmoavtpeylund.supabase.co/rest/v1/driver_service?id=eq.${selectedServiceId}`;
    const body = { active: isActive };
    const headers = {
      Authorization: `Bearer ${access_token}`, // Replace with the actual access token
      apiKey: process.env.REACT_APP_BEARER_TOKEN,
      Prefer: 'return=representation',
    };

    try {
      const response = await axios.patch(url, body, { headers });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleServiceDelete = async () => {
    const url = `https://wgjgzlvwmoavtpeylund.supabase.co/rest/v1/driver_service?id=eq.${selectedServiceId}`;
    const headers = {
      Authorization: `Bearer ${access_token}`, // Replace with the actual access token
      apiKey: process.env.REACT_APP_BEARER_TOKEN,
    };

    try {
      const response = await axios.delete(url, { headers });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const totalItems = services.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const currentItems = services.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-md-4">
              <div className="provider-subtitle">
                <h6>My Services</h6>
              </div>
            </div>
            <div className="col-md-8 d-flex align-items-center justify-content-md-end flex-wrap">
              <Link
                to={routes.providerCreateService}
                className="btn btn-primary add-set"
              >
                <Icon.Plus className="react-feather-icon me-2" />
                Add Service
              </Link>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-md-12">
            <div className="tab-list">
              <ul className="nav">
                <li>
                  <Link
                    to="#"
                    className="active"
                    data-bs-toggle="tab"
                    data-bs-target="#active-service"
                  >
                    Actice Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    data-bs-toggle="tab"
                    data-bs-target="#inactive-service"
                  >
                    Inactive Services
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="tab-content pt-0">
          <div className="tab-pane active" id="active-service">
            <div className="row">
              {currentItems
                .filter((service) => service.active && service.verified) // Only show verified services in the active list
                .map((service, index) => (
                  <div className="col-xl-4 col-md-6" key={index}>
                    <div className="service-widget pro-service">
                      <div className="service-img">
                        <img
                          className="img-fluid serv-img"
                          alt="Service Image"
                          src={service.van_photo}
                          style={{ width: '500px', height: '500px' }}
                        />
                        <div className="fav-item">
                          <div className="item-info">
                            <span className="item-cat">
                              {service.insurance_level}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="service-content">
                        <h3 className="title">Name: {service.driver_name}</h3>
                        <h3 className="title">
                          Driver ID: {service.driver_service_id}
                        </h3>
                        <div className="serv-info">
                          <div>
                            <Link
                              to={`${routes.providerEditService}/${service.driver_service_id}`}
                              className="serv-edit"
                            >
                              <Icon.Edit className="react-feather-icon" /> Edit
                            </Link>
                            <Link
                              to="#"
                              className="serv-edit"
                              data-bs-toggle="modal"
                              data-bs-target="#del-service"
                              onClick={() =>
                                setSelectedServiceId(service.driver_service_id)
                              } // Set the selectedServiceId when the button is clicked
                            >
                              <Icon.AlertCircle className="react-feather-icon" />{' '}
                              Delete
                            </Link>
                          </div>
                          <Link
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#in-active"
                            className="btn btn-book"
                            onClick={() =>
                              setSelectedServiceId(service.driver_service_id)
                            } // Set the selectedServiceId when the button is clicked
                          >
                            Make Inactive
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="tab-pane fade" id="inactive-service">
            <div className="row">
              {currentItems
                .filter((service) => !service.active || !service.verified) // Show unverified services in the inactive list
                .map((service) => (
                  <div className="col-xl-4 col-md-6" key={service.id}>
                    <div className="service-widget pro-service">
                      <div className="service-img">
                        <img
                          className="img-fluid serv-img"
                          alt="Service Image"
                          src={service.van_photo}
                          style={{ width: '500px', height: '500px' }}
                        />
                        <div className="fav-item">
                          <div className="item-info">
                            <span className="item-cat">
                              {service.insurance_level}
                            </span>
                          </div>
                          {!service.verified && ( // If the service is not verified, render "Not Verified"
                            <span className="item-cat">Not Verified</span>
                          )}
                        </div>
                      </div>
                      <div className="service-content">
                        <h3 className="title">Name: {service.driver_name}</h3>
                        <h3 className="title">
                          Driver ID: {service.driver_service_id}
                        </h3>{' '}
                        <div className="serv-info">
                          <div>
                            <Link
                              to={`${routes.providerEditService}/${service.driver_service_id}`}
                              className="serv-edit"
                            >
                              <Icon.Edit className="react-feather-icon" /> Edit
                            </Link>
                            <Link
                              to="#"
                              className="serv-edit"
                              data-bs-toggle="modal"
                              data-bs-target="#del-service"
                              onClick={() =>
                                setSelectedServiceId(service.driver_service_id)
                              } // Set the selectedServiceId when the button is clicked
                            >
                              <Icon.AlertCircle className="react-feather-icon" />{' '}
                              Delete
                            </Link>
                          </div>
                          {service.verified && ( // Only render the "Make Active" button if the service is verified
                            <Link
                              to="#"
                              data-bs-toggle="modal"
                              data-bs-target="#active"
                              className="btn btn-book"
                              onClick={() =>
                                setSelectedServiceId(service.driver_service_id)
                              } // Set the selectedServiceId when the button is clicked
                            >
                              Make Active
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* Pagination */}
        <div className="row">
          <div className="col-sm-12">
            <div className="blog-pagination rev-page">
              <nav>
                <ul className="pagination justify-content-center mt-0">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? 'disabled' : ''
                    }`}
                  >
                    <Link className="page-link page-prev" onClick={handlePrev}>
                      <i className="fa-solid fa-arrow-left me-1" /> PREV
                    </Link>
                  </li>
                  {[...Array(totalPages)].map((_, index) => (
                    <li
                      className={`page-item ${
                        index + 1 === currentPage ? 'active' : ''
                      }`}
                      key={index}
                    >
                      <Link
                        className="page-link"
                        onClick={() => handleClick(index + 1)}
                      >
                        {index + 1}
                      </Link>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? 'disabled' : ''
                    }`}
                  >
                    <Link className="page-link page-next" onClick={handleNext}>
                      NEXT <i className="fa-solid fa-arrow-right ms-1" />
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        {/* /Pagination */}
      </div>
      {/* Inactive Service */}
      <div className="modal fade custom-modal" id="in-active">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-bottom-0 justify-content-between">
              <h5 className="modal-title">Inactivate Service</h5>
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
                <form action={routes.providerService}>
                  <p>Are you sure want to inactivate this service?</p>
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
                      onClick={() => handleServiceStatusChange(false)} // Pass the driver_service_id to the function
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
      {/* /Inactive Service */}
      {/* Active Service */}
      <div className="modal fade custom-modal" id="active">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-bottom-0 justify-content-between">
              <h5 className="modal-title">Activate Service</h5>
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
                <form action={routes.providerService}>
                  <p>Are you sure want to activate this service?</p>
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
                      onClick={() => handleServiceStatusChange(true)} // Pass the driver_service_id to the function
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
      {/* /Inactive Service */}
      {/* Delete Service */}
      <div className="modal fade custom-modal" id="del-service">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-bottom-0 justify-content-between">
              <h5 className="modal-title">Delete Service</h5>
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
                <form action={routes.providerService}>
                  <p>Are you sure want to delete this service?</p>
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
      <>
        {/* Loading Modal */}
        <div
          className="modal fade"
          id="loadingModal"
          tabIndex={-1}
          aria-labelledby="loadingModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Loading Modal */}
      </>
    </div>
  );
};

export default ProviderServices;
