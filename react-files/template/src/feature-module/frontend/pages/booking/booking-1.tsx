import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import * as Icon from 'react-feather';
import ImageWithBasePath from '../../../../core/img/ImageWithBasePath';
import { all_routes } from '../../../../core/data/routes/all_routes';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setStripe } from '../../../../core/data/redux/action';
import PhoneInput from 'react-phone-input-2';

const Booking1 = () => {
  const routes = all_routes;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pageParams = useSelector((state: any) => state.quotes);

  const [quote, setQuote] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    sessionStorage.removeItem('bookingDone');
  }, []);


  useEffect(() => {
    const params = {
      driver_service_id: sessionStorage.getItem('driverServiceId'),
      day_of_week: getDayName(pageParams.day_of_week),
      van_size: pageParams.van_size,
      helper_count: pageParams.helper_count,
      packings: getPackingOptions(pageParams.packings),
      assembly: getAssemblyOptions(pageParams.assembly),
      piano: handleEmptyArray(pageParams.piano),
      hours: parseInt(pageParams.hours, 10),
      floors: parseInt(pageParams.floors, 10),
      totalDistance: sessionStorage.getItem('totalDistance'),
    };

    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://wgjgzlvwmoavtpeylund.supabase.co/functions/v1/get-quote',
          params,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
            },
          },
        );

        setQuote(response.data);

        const stripeParams = {
          amount: calculateTotalPrice(response.data),
          name: response.data.driver_name,
          location: response.data.location,
          profile: response.data.profile,
          vanPhoto: response.data.van_photo,
          customerName: name,
          customerEmail: email,
          customerPhone: phoneNumber,
          driverId: response.data.driver_id,
          driverServiceId: response.data.driver_service_id,
        };
        dispatch(setStripe(stripeParams));
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [name, email, phoneNumber]); 

const handleNextClick = () => {
  if (!name || !email || !phoneNumber) {
    setErrorMessage('Please fill in all fields before proceeding.');
    return;
  }

  // Navigate to the next page if all fields are filled
  navigate(routes.bookingPayment);
};


  const getDayName = (dayNumber) => {
    const days = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];
    return days[dayNumber];
  };

  const handleEmptyArray = (arr) => {
    if (arr.length === 0) {
      return '';
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
  const calculateTotalPrice = (data) => {
    let total_price = data.price || 0;

    total_price += data.floors_price || 0;

    total_price += parseFloat(data.mileage_price) || 0;

    const packing_price = data.packing_price || [];
    for (const packing of packing_price) {
      total_price += packing.price || 0;
    }

    const assembly_price = data.assembly_price || [];
    for (const assembly of assembly_price) {
      total_price += assembly.price || 0;
    }

    total_price += data.piano_price || 0;

    return total_price;
  };

  const handleOnChange = (value: string, country: string) => {
    setPhoneNumber(value);
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
          className="bgimg3"
        />
      </div>
      <div className="content">
        <div className="container">
          <div className="row">
            {/* Booking */}
            <div className="col-lg-10 mx-auto">
              {/* Booking Step */}
              <ul className="step-register row">
                <li className="active col-md-4">
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
                <li className="col-md-4">
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
              {/* Appointment */}
              <div className="booking-service">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="service-book">
                      <div className="service-book-img">
                        <img src={quote.van_photo} alt="img" />
                      </div>
                      <div className="serv-profile">
                        <span className="badge">{quote.insurance_level}</span>
                        <h2>{quote.driver_name}</h2>
                        <ul>
                          <li className="serv-pro">
                            <img src={quote.profile} alt="img" />
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="row align-items-center">
                      <div className="col-md-7 col-sm-6">
                        <div className="provide-box">
                          <span>
                            <Icon.MapPin className="react-feather-custom" />
                          </span>
                          <div className="provide-info">
                            <h6>Collection Address</h6>
                            <p>{pageParams.collection_location}</p>
                          </div>
                        </div>
                        <div className="provide-box">
                          <span>
                            <Icon.MapPin className="react-feather-custom" />
                          </span>
                          <div className="provide-info">
                            <h6>Delivery Address</h6>
                            <p>{pageParams.dropoff_location}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-5 col-sm-6">
                        <div className="provide-box">
                          <span>
                            <ImageWithBasePath
                              src="assets/img/icons/service-icon.svg"
                              alt="img"
                            />
                          </span>
                          <div className="provide-info">
                            <h6>Service Amount</h6>
                            <h5>£{calculateTotalPrice(quote)} </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Appointment */}
              <div>
                <div className="card booking-info-tab h-100">
                  <ul className="nav nav-pills" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <div className="nav-link active" role="tab">
                        Book as Guest
                      </div>
                    </li>
                  </ul>
                  <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" role="tabpanel">
                      <form>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="email"
                                className="form-control"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                               <PhoneInput
                              country={'gb'}
                              value={phoneNumber}
                              onChange={handleOnChange}
                              />
                            </div>
                          </div>
                        </div>
                        <br />
                      </form>
                    </div>
                    {errorMessage && (
                        <div
                          style={{
                            color: 'red',
                            textAlign: 'center',
                            // Add any other styles you want
                          }}
                        >
                          {errorMessage}
                        </div>
                      )}
                    <div className="book-submit text-end">
                      <Link
                        to={routes.serviceList}
                        className="btn btn-secondary"
                      >
                        Back
                      </Link>
                      <button
                        onClick={handleNextClick}
                        className="btn btn-primary"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Booking */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking1;
