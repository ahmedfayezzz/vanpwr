import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../../../core/img/ImageWithBasePath';
import { all_routes } from '../../../../core/data/routes/all_routes';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import { useSelector } from 'react-redux';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY as string);
const BookingPayment = () => {
  const routes = all_routes;
  const pageParams = useSelector((state: any) => state.stripe);
  const pageParams1 = useSelector((state: any) => state.quotes);

  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://wgjgzlvwmoavtpeylund.supabase.co/functions/v1/create-checkout-session',
          {
            driver_service_name: pageParams.name,
            price: parseFloat((pageParams.amount * 0.2).toFixed(2)),
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
            },
          },
        );
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

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
          className="bgimg3"
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

                <li className="active col-md-4">
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
                <li className="col-md-4">
                  <div className="multi-step-icon">
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
              {/* Booking Payment */}
              <div className="row">
                {/* <div className="col-lg-6">
                  <h5 className="pay-title">Payment Methods</h5>
                  <div className="payment-card">
                    <div className="payment-head">
                      <div className="payment-title">
                        <label className="custom_radio">
                          <input
                            type="radio"
                            name="payment"
                            className="card-payment"
                          />
                          <span className="checkmark" />
                        </label>
                        <h6>Deposit (Remainder On Delivery)</h6>
                      </div>
                    </div>
                  </div>
                  <div className="payment-card">
                    <div className="payment-head">
                      <div className="payment-title">
                        <label className="custom_radio credit-card-option">
                          <input
                            type="radio"
                            name="payment"
                            className="card-payment"
                          />
                          <span className="checkmark" />
                        </label>
                        <h6>Full Amount</h6>
                      </div>
                    </div>
                  </div>
                  <div className="payment-list">
                    <div className="row align-items-center">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label className="col-form-label">Name on Card</label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Enter Name on Card"
                          />
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <label className="col-form-label">Card Number</label>
                          <input
                            className="form-control"
                            placeholder="**** **** **** ****"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-md-4 text-end">
                        <div className="form-group">
                          <label className="col-form-label">&nbsp;</label>
                          <ImageWithBasePath
                            src="assets/img/payment-card.png"
                            className="img-fluid"
                            alt="image"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Expiration date
                          </label>
                          <input
                            className="form-control"
                            placeholder="MM/YY"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Security code
                          </label>
                          <input
                            className="form-control"
                            placeholder="CVV"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}

                <div className="col-lg-6">
                  <h5 className="pay-title">Booking Summary</h5>
                  <div className="summary-box">
                    <div className="booking-info">
                      <div className="service-book">
                        <div className="service-book-img">
                          <img src={pageParams.vanPhoto} alt="img" />
                        </div>
                        <div className="serv-profile">
                          <h2>{pageParams.name}</h2>
                          <ul>
                            <li className="serv-pro">
                              <img src={pageParams.profile} alt="img" />
                            </li>
                            <li className="service-map">
                              <Icon.MapPin
                                className="react-feather-custom"
                                color="#C2C9D1"
                              />{' '}
                              {pageParams.location}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="booking-summary">
                      <ul className="booking-date">
                        <li>
                          Date <span>{pageParams1.date}</span>
                        </li>
                        <li>
                          Time <span>{pageParams1.time}</span>
                        </li>
                        <li>
                          Hours <span>{pageParams1.hours}</span>
                        </li>
                        <li>
                          Van Size <span>{pageParams1.van_size}</span>
                        </li>
                        <li>
                          Collection{' '}
                          <span>{pageParams1.collection_location}</span>
                        </li>
                        <li>
                          Dropoff <span>{pageParams1.dropoff_location}</span>
                        </li>
                      </ul>
                      <div className="booking-total">
                        <ul className="booking-total-list">
                          <li>
                            <span>Reserve driver for</span>
                            <span className="total-cost">
                              £{parseFloat((pageParams.amount * 0.2).toFixed(2))}
                            </span>
                          </li>
                          <li>
                            <span>Remaining balance to be paid to driver</span>
                            <span className="total-cost">
                              £{parseFloat((pageParams.amount * 0.8).toFixed(2))}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* <div className="booking-coupon">
                    <div className="form-group w-100">
                      <div className="coupon-icon">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Coupon Code"
                        />
                        <span>
                          <ImageWithBasePath
                            src="assets/img/icons/coupon-icon.svg"
                            alt="image"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="form-group">
                      <button className="btn btn-primary apply-btn">
                        Apply
                      </button>
                    </div>
                  </div>
                  <div className="save-offer">
                    <p>
                      <i className="fa-solid fa-circle-check" /> Your total
                      saving on this order $5.00
                    </p>
                  </div> */}
                  <br />
                  <div className="booking-pay">
                    <Link
                      to={routes.booking1}
                      className="btn btn-secondary btn-skip"
                    >
                      Back
                    </Link>
                  </div>
                </div>
                <div className="col-lg-6">
                  {clientSecret && (
                    <EmbeddedCheckoutProvider
                      stripe={stripePromise}
                      options={{ clientSecret }}
                    >
                      <EmbeddedCheckout />
                    </EmbeddedCheckoutProvider>
                  )}
                </div>
              </div>
              {/* /Booking Payment */}
            </div>
            {/* /Booking */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPayment;
