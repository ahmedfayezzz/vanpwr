import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import ImageWithBasePath from '../../../../core/img/ImageWithBasePath';
import ProviderBookingModal from '../../common/modals/provider-booking-modal';
import { all_routes } from '../../../../core/data/routes/all_routes';
import axios from 'axios';
import { Modal } from 'bootstrap';

const ProviderAvailableJobs = () => {
  const routes = all_routes;
  const navigate = useNavigate();

  const user_id = sessionStorage.getItem('user_id');
  const access_token = sessionStorage.getItem('access_token');

  const [availableJobs, setAvailableJobs] = useState([]);
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [selectedServices, setSelectedServices] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseJobs = await axios.get(
          'https://wgjgzlvwmoavtpeylund.supabase.co/rest/v1/available_jobs?select=*',
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              apikey: process.env.REACT_APP_BEARER_TOKEN,
            },
          },
        );

        setAvailableJobs(responseJobs.data);

        const params = {
          driver_id: user_id,
        };

        const responseServices = await axios.post(
          'https://wgjgzlvwmoavtpeylund.supabase.co/functions/v1/get-services',
          params,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          },
        );

        setServices(responseServices.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);
  const handleConfirm = async (jobId: number) => {
    const serviceId = selectedServices[jobId];

    if (!serviceId) {
      console.error('No service selected');
      return;
    }

    try {
      const response = await axios.patch(
        `https://wgjgzlvwmoavtpeylund.supabase.co/rest/v1/available_jobs?id=eq.${jobId}`,
        {
          driver_service_id: serviceId,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            apiKey: process.env.REACT_APP_BEARER_TOKEN,
          },
        },
      );

      navigate(routes.providerBooking);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSelectService = (bookingId, serviceId) => {
    setSelectedServices((prevServices) => ({
      ...prevServices,
      [bookingId]: serviceId,
    }));
  };

  const totalItems = availableJobs.length;
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

  const currentItems = availableJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-md-4">
                <div className="provider-subtitle">
                  <h6>Available Jobs List</h6>
                </div>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="row">
              {currentItems.map((availableJobs, index) => (
                <div className="col-md-4" key={index}>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <ul className="booking-details">
                            {/* replace with your actual availableJobs details */}
                            <li>
                              <span className="book-item">Booking Date</span> :{' '}
                              {availableJobs.date}
                            </li>
                            <li>
                              <span className="book-item">Booking Time</span> :{' '}
                              {availableJobs.time}
                            </li>
                            <li>
                              <span className="book-item">Hours</span> :{' '}
                              {availableJobs.hours}
                            </li>
                            <li>
                              <span className="book-item">Amount</span> :{' '}
                              {availableJobs.price}
                            </li>
                            <li>
                              <span className="book-item">
                                Collection Location
                              </span>{' '}
                              : {availableJobs.collection_location}
                            </li>
                            <li>
                              <span className="book-item">
                                Delivery Location
                              </span>{' '}
                              : {availableJobs.dropoff_location}
                            </li>
                            <li>
                              <span className="book-item">Description</span> :{' '}
                              {availableJobs.description}
                            </li>
                          </ul>
                        </div>
                        <div className="col-md-6">
                          <ul className="booking-details">
                            <li>
                              <span className="book-item">Booking Ref</span> :{' '}
                              {availableJobs.booking_ref}
                            </li>
                            <li>
                              <span className="book-item">Van Size</span> :{' '}
                              {availableJobs.van_size}
                            </li>
                            <li>
                              <span className="book-item">Helper Count</span> :{' '}
                              {availableJobs.helper_count}
                            </li>
                            <li>
                              <span className="book-item">Helper Count</span> :{' '}
                              {availableJobs.helper_count}
                            </li>
                            <li>
                              <span className="book-item">Assembly</span> :
                              {availableJobs.assembly &&
                                availableJobs.assembly.map((item, index) => (
                                  <div key={index}>
                                    Type: {item.type}, Amount: {item.amount}
                                  </div>
                                ))}
                            </li>
                            <li>
                              <span className="book-item">Packings</span> :
                              {availableJobs.packings &&
                                availableJobs.packings.map((item, index) => (
                                  <div key={index}>
                                    Name: {item.name}, Amount: {item.amount}
                                  </div>
                                ))}
                            </li>
                            <li>
                              <span className="book-item">Piano</span> :{' '}
                              {availableJobs.piano}
                            </li>
                            <li>
                              <span className="book-item">Floors</span> :{' '}
                              {availableJobs.floors}
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="booking-action">
                        <div className="row">
                          <div className="col-md-12">
                            <Dropdown
                              value={selectedServices[availableJobs.id]}
                              onChange={(e) =>
                                handleSelectService(availableJobs.id, e.value)
                              }
                              options={services
                                .filter(
                                  (service) =>
                                    service.active && service.verified,
                                )
                                .map((service) => ({
                                  value: service.driver_service_id, // Use driver_service_id instead of id
                                  label: service.driver_name,
                                }))}
                              placeholder="Assign Driver"
                              className="select service-select"
                              style={{ marginRight: '10px' }} // Add some space between the dropdown and the button
                            />
                          </div>
                          <div className="col-md-12">
                            <Link
                              to="#"
                              type="submit"
                              className="btn btn-primary"
                              onClick={() => handleConfirm(availableJobs.id)}
                            >
                              Confirm Booking
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
                      <Link
                        to="#"
                        className="page-link page-prev"
                        onClick={handlePrev}
                      >
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
                          to="#"
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
                      <Link
                        to="#"
                        className="page-link page-next"
                        onClick={handleNext}
                      >
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
      </div>

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
    </>
  );
};

export default ProviderAvailableJobs;
