import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import ImageWithBasePath from '../../../../core/img/ImageWithBasePath';
import ProviderBookingModal from '../../common/modals/provider-booking-modal';
import { all_routes } from '../../../../core/data/routes/all_routes';
import axios from 'axios';
import CountUp from 'react-countup';

const ProviderBooking = () => {
  const routes = all_routes;

  const access_token = sessionStorage.getItem('access_token');

  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://wgjgzlvwmoavtpeylund.supabase.co/rest/v1/booking?select=*',
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              apikey: process.env.REACT_APP_BEARER_TOKEN,
            },
          },
        );

        setBookings(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleConfirm = async (bookingId) => {
    try {
      const response = await axios.patch(
        `https://wgjgzlvwmoavtpeylund.supabase.co/rest/v1/booking?id=eq.${bookingId}`,
        {
          accepted: 'true',
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            apikey: process.env.REACT_APP_BEARER_TOKEN,
          },
        },
      );

      // Reload the page
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      const response = await axios.patch(
        `https://wgjgzlvwmoavtpeylund.supabase.co/rest/v1/booking?id=eq.${bookingId}`,
        {
          accepted: 'false',
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            apikey: process.env.REACT_APP_BEARER_TOKEN,
          },
        },
      );
      // Update the bookings state if necessary
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const totalItems = bookings.length;
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

  const currentItems = bookings.slice(
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
                  <h6>Booking List</h6>
                </div>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="row">
              {currentItems.map((booking, index) => (
                <div className="col-md-4" key={index}>
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">
                        <div>Driver ID: {booking.driver_service_id}</div>
                      </h3>
                      <div className="row">
                        <div className="col-md-6">
                          <ul className="booking-details">
                            {/* replace with your actual booking details */}
                            <li>
                              <span className="book-item">Booking Date</span> :{' '}
                              {booking.date}
                            </li>
                            <li>
                              <span className="book-item">Booking Time</span> :{' '}
                              {booking.time}
                            </li>
                            <li>
                              <span className="book-item">Hours</span> :{' '}
                              {booking.hours}
                            </li>
                            <li>
                              <span className="book-item">Amount</span> :{' '}
                              {booking.price}
                            </li>
                            <li>
                              <span className="book-item">
                                Collection Location
                              </span>{' '}
                              : {booking.collection_location}
                            </li>
                            <li>
                              <span className="book-item">
                                Delivery Location
                              </span>{' '}
                              : {booking.dropoff_location}
                            </li>
                            <li>
                              <span className="book-item">Description</span> :{' '}
                              {booking.description}
                            </li>
                          </ul>
                        </div>
                        <div className="col-md-6">
                          <ul className="booking-details">
                            <li>
                              <span className="book-item">Booking Ref</span> :{' '}
                              {booking.booking_ref}
                            </li>
                            <li>
                              <span className="book-item">Van Size</span> :{' '}
                              {booking.van_size}
                            </li>
                            <li>
                              <span className="book-item">Helper Count</span> :{' '}
                              {booking.helper_count}
                            </li>
                            <li>
                              <span className="book-item">Assembly</span> :
                              {booking.assembly &&
                                booking.assembly.map((item, index) => (
                                  <div key={index}>
                                    Type: {item.type}, Amount: {item.amount}
                                  </div>
                                ))}
                            </li>
                            <li>
                              <span className="book-item">Packings</span> :
                              {booking.packings &&
                                booking.packings.map((item, index) => (
                                  <div key={index}>
                                    Name: {item.name}, Amount: {item.amount}
                                  </div>
                                ))}
                            </li>
                            <li>
                              <span className="book-item">Piano</span> :{' '}
                              {booking.piano}
                            </li>
                            <li>
                              <span className="book-item">Floors</span> :{' '}
                              {booking.floors}
                            </li>
                          </ul>
                        </div>
                      </div>
                      {booking.accepted ? (
                        <div>
                          <p>Customer Name: {booking.customer_name}</p>
                          <p>Customer Email: {booking.customer_email}</p>
                          <p>Customer Phone: {booking.customer_phone}</p>

                          <Link
                            to="#"
                            className="btn-acc"
                            data-bs-toggle="modal"
                            data-bs-target="#del-service"
                            onClick={() => setSelectedBookingId(booking.id)}
                          >
                            Cancel Booking
                          </Link>
                        </div>
                      ) : (
                        <div className="booking-action">
                          <Link
                            to="#"
                            type="submit"
                            className="btn btn-primary"
                            onClick={() => handleConfirm(booking.id)}
                          >
                            Confirm Booking
                          </Link>
                          <Link
                            to="#"
                            className="btn-acc"
                            data-bs-toggle="modal"
                            data-bs-target="#del-service"
                            onClick={() => setSelectedBookingId(booking.id)}
                          >
                            Cancel Booking
                          </Link>
                        </div>
                      )}
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
      {/* Delete Service */}
      <div className="modal fade custom-modal" id="del-service">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-bottom-0 justify-content-between">
              <h5 className="modal-title">Cancel booking</h5>
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
                <form action={routes.providerAvailableJobs}>
                  <p>Are you sure want to cancel this booking?</p>
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
                      onClick={() => handleCancel(selectedBookingId)}
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
    </>
  );
};

export default ProviderBooking;
