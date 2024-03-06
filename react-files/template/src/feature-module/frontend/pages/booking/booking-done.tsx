import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';
import ImageWithBasePath from '../../../../core/img/ImageWithBasePath';
import { all_routes } from '../../../../core/data/routes/all_routes';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { resetState } from '../../../../core/data/redux/action';

const BookingDone = () => {
  const routes = all_routes;

  const pageParams = useSelector((state: any) => state.stripe);
  const pageParams1 = useSelector((state: any) => state.quotes);

  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  const [bookingReference, setBookingReference] = useState(
    sessionStorage.getItem('newBookingReference') || '',
  );

  useEffect(() => {
    const fetchSessionStatus = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const sessionId = urlParams.get('session_id');

      try {
        const response = await axios.get(
          `https://wgjgzlvwmoavtpeylund.supabase.co/functions/v1/session-status?session_id=${sessionId}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
            },
          },
        );

        const data = response.data;
        setStatus(data.status);
        setCustomerEmail(data.customer_email);

        if (
          data.status === 'complete' &&
          !sessionStorage.getItem('bookingDone')
        ) {
          const fullUUID = uuidv4();
          const shortUUID = fullUUID.split('-').shift();
          const newBookingReference = shortUUID;
          sessionStorage.setItem('newBookingReference', newBookingReference);
          setBookingReference(newBookingReference);

          const params = {
            driver_service_id: pageParams.driverServiceId,
            date: dayjs(pageParams1.date, 'DD/MM/YYYY').toISOString(),
            time: pageParams1.time,
            collection_location: pageParams1.collection_location,
            dropoff_location: pageParams1.dropoff_location,
            price: pageParams.amount,
            driver_id: pageParams.driverId,
            customer_email: pageParams.customerEmail,
            customer_phone: pageParams.customerPhone,
            customer_name: pageParams.customerName,
            description: pageParams1.description,
            booking_ref: newBookingReference,
            van_size: pageParams1.van_size,
            helper_count: pageParams1.helper_count,
            packings: getPackingOptions(pageParams1.packings),
            assembly: getAssemblyOptions(pageParams1.assembly),
            hours: parseInt(pageParams1.hours, 10),
            floors: parseInt(pageParams1.floors, 10),
          };

          if (pageParams1.piano && pageParams1.piano.length > 0) {
            params.piano = handleEmptyArray(pageParams1.piano);
          }


          try {
            const bookingResponse = await axios.post(
              'https://wgjgzlvwmoavtpeylund.supabase.co/rest/v1/booking',
              params,
              {
                headers: {
                  Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
                  apiKey: process.env.REACT_APP_BEARER_TOKEN,
                  Prefer: 'return=minimal',
                },
              },
            );


            // Set the flag in session storage
            sessionStorage.setItem('bookingDone', 'true');
            sessionStorage.setItem('bookingReference', newBookingReference);
          } catch (bookingError) {
            console.error(bookingError);
          }
        }
      } catch (sessionStatusError) {
        console.error(sessionStatusError);
      }
    };

    fetchSessionStatus();
  }, []);

  const handleEmptyArray = (arr) => {
    if (arr.length === 0) {
      return '';
    } else {
      arr = arr.map((item) => {
        return item.name.toLowerCase().split(' ')[0];
      });
    }
    return arr;
  };

  const getAssemblyOptions = (assemblyOptions) => {
    if (
      assemblyOptions.length === 1 &&
      assemblyOptions[0].name === '' &&
      assemblyOptions[0].type === ''
    ) {
      return [];
    }
    return assemblyOptions;
  };

  const getPackingOptions = (packingOptions) => {
    if (
      packingOptions.length === 1 &&
      packingOptions[0].name === '' &&
      packingOptions[0].amount === 0
    ) {
      return [];
    }
    return packingOptions;
  };

  return (
    <div>
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
          className="bgimg3 w-50"
        />
      </div>
      <div className="content book-content">
        <div className="container">
          <div className="row">
            {/* Booking */}
            <div className="col-lg-10 mx-auto">
              {/* Booking Step */}
              <ul className="step-register row">
                <li className="activate col-md-4">
                  <div className="multi-step-icon">
                    <Icon.User
                      className="standard-feather"
                      style={{ color: 'white' }}
                    />
                  </div>
                  <div className="multi-step-info">
                    <h6>Information</h6>
                    <p>Enter Booking Information</p>
                  </div>
                </li>
                <li className="activate col-md-4">
                  <div className="multi-step-icon">
                    <ImageWithBasePath
                      src="assets/img/icons/wallet-icon.svg"
                      alt="img"
                    />
                  </div>
                  <div className="multi-step-info">
                    <h6>Payment</h6>
                    <p>Select Payment Gateway</p>
                  </div>
                </li>
                <li className="active col-md-4">
                  <div className=" multi-step-icon">
                    <ImageWithBasePath
                      src="assets/img/icons/book-done.svg"
                      alt="img"
                    />
                  </div>
                  <div className="multi-step-info">
                    <h6>Done </h6>
                    <p>Completion of Booking</p>
                  </div>
                </li>
              </ul>
              {/* /Booking Step */}
              {/* Booking Done */}
              <div className="row align-items-center">
                <div className="col-md-7">
                  <div className="booking-done">
                    <h6>Your Booking is Confirmed! </h6>
                    <h6>(Ref: {bookingReference})</h6>

                    <p>Thank you for choosing Vanpowr an email will be sent once the driver confirms.</p>
                    <div className="book-submit">
                      <Link to={routes.homeOne} className="btn btn-primary">
                        <Icon.ArrowLeftCircle className="react-feather-custom" />{' '}
                        Go to Home
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="booking-done">
                    <ImageWithBasePath
                      src="assets/img/booking-done.png"
                      className="img-fluid"
                      alt="image"
                    />
                  </div>
                </div>
              </div>
              {/* /Booking Done */}
            </div>
            {/* /Booking */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDone;
