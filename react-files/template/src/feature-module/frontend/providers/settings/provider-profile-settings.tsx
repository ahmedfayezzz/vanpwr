import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import * as Icon from 'react-feather';
import PlacesAutocomplete from 'react-places-autocomplete';

import { Dropdown } from 'primereact/dropdown';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ImageWithBasePath from '../../../../core/img/ImageWithBasePath';
import DefaultEditor from 'react-simple-wysiwyg';
import { all_routes } from '../../../../core/data/routes/all_routes';
import ProviderAuthHeader from './common/header1';
import { Calendar } from 'primereact/calendar';
import PhoneInput from 'react-phone-input-2';
import axios from 'axios';
import { Modal } from 'bootstrap';
const routes = all_routes;

const ProviderProfileSettings = () => {
  dayjs.extend(customParseFormat);
  const navigate = useNavigate();
  const email1 = sessionStorage.getItem('email');
  const access_token = sessionStorage.getItem('access_token');
  const user_id = sessionStorage.getItem('user_id');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(email1);
  const [date, setDate] = useState<Nullable<Date>>(null);
  const [selectedGender, setGender] = useState(null);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [proofOfId, setProofOfId] = useState([]);
  const [proofOfAddress, setProofOfAddress] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://wgjgzlvwmoavtpeylund.supabase.co/rest/v1/driver?select=*',
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              apiKey: process.env.REACT_APP_BEARER_TOKEN,
            },
          },
        );

        if (response.status === 200) {
          const service = response.data[0];
          // Update the state variables with the service details
          setFirstName(service.first_name);
          setLastName(service.last_name);
          setEmail(service.email_address);
          setPhone(service.mobile_number);
          setGender(service.gender);
          setDate(new Date(service.date_of_birth));
          setAddress(service.address);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loadingModalElement = document.getElementById('loadingModal');
    const loadingModal = new Modal(loadingModalElement);
    loadingModal.show();

    try {
      const params = {
        email_address: email,
        first_name: firstName,
        last_name: lastName,
        mobile_number: phone,
        gender: selectedGender ? selectedGender.toLowerCase() : null,
        date_of_birth: dayjs(date).format('DD/MM/YYYY'),
        address: address,
      };

      const response = await axios.patch(
        `https://wgjgzlvwmoavtpeylund.supabase.co/rest/v1/driver?id=eq.${user_id}`,
        params,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            apiKey: process.env.REACT_APP_BEARER_TOKEN,
            Prefer: 'return=minimal',
          },
        },
      );

 

        // If the first API call is successful, upload each file in proofOfId and proofOfAddress
        const uploadPromises = [];

        if (proofOfId && proofOfId.length > 0) {
          proofOfId.forEach((file, index) => {
            const formData = new FormData();
            formData.append('file', file);

            const uploadPromise = axios
              .post(
                `https://wgjgzlvwmoavtpeylund.supabase.co/storage/v1/object/documents/${user_id}/proof_of_id/${index}`,
                formData,
                {
                  headers: {
                    Authorization: `Bearer ${access_token}`,
                    apiKey: process.env.REACT_APP_BEARER_TOKEN,
                    'Content-Type': 'multipart/form-data',
                  },
                },
              )
              .catch((error) =>
                console.error(`proofOfId file ${index} upload failed`, error),
              );

            uploadPromises.push(uploadPromise);
          });
        }

        if (proofOfAddress && proofOfAddress.length > 0) {
          proofOfAddress.forEach((file, index) => {
            const formData = new FormData();
            formData.append('file', file);

            const uploadPromise = axios
              .post(
                `https://wgjgzlvwmoavtpeylund.supabase.co/storage/v1/object/documents/${user_id}/proof_of_address/${index}`,
                formData,
                {
                  headers: {
                    Authorization: `Bearer ${access_token}`,
                    apiKey: process.env.REACT_APP_BEARER_TOKEN,
                    'Content-Type': 'multipart/form-data',
                  },
                },
              )
       
              .catch((error) =>
                console.error(
                  `proofOfAddress file ${index} upload failed`,
                  error,
                ),
              );

            uploadPromises.push(uploadPromise);
          });
        }

        // Wait for all uploads to complete
        await Promise.all(uploadPromises);


        loadingModal.hide();

        const successModalElement = document.getElementById('successmodal');
        const successModal = new Modal(successModalElement);
        successModal.show();

        setTimeout(() => {
          // Manually hide the modal and remove the modal backdrop
          successModal.hide();
          const modalBackdrop = document.querySelector('.modal-backdrop');
          if (modalBackdrop) {
            modalBackdrop.remove();
          }
          navigate(routes.providerService);
        }, 2000);
    } catch (error) {
      loadingModal.hide();

      console.error('Error:', error);
    }
  };

  const handleOnChange = (value: string, country: string) => {
    setPhone(value);
  };

  const handleAddressSelect = (address) => {
    setAddress(address);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleProofOfIdChange = (event) => {
    setProofOfId([...proofOfId, ...event.target.files]);
  };

  const handleProofOfAddressChange = (event) => {
    setProofOfAddress([...proofOfAddress, ...event.target.files]);
  };

  const deleteProofOfId = (index) => {
    setProofOfId(proofOfId.filter((_, i) => i !== index));
  };

  const deleteProofOfAddress = (index) => {
    setProofOfAddress(proofOfAddress.filter((_, i) => i !== index));
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const gender = ['Male', 'Female'];

  const options = {
    types: ['address'],
    componentRestrictions: { country: 'uk' },
  };
  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Profile settings */}
          <div className="row">
            <div className="col-md-12 mx-auto">
              {/* /Service List */}
              <div className="service-inform-fieldset">
                {/* Service Information */}
                <fieldset id="first-field">
                  <div className="card add-service">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="sub-title">
                          <h6>Provider Information</h6>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            First Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter First Name"
                            value={firstName}
                            onChange={handleFirstNameChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Last Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Last Name"
                            value={lastName}
                            onChange={handleLastNameChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Email <span className="text-danger">*</span>
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter Email Address"
                            value={email || ''}
                            onChange={handleEmailChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Mobile Number <span className="text-danger">*</span>
                          </label>
                          <PhoneInput
                            country={'gb'}
                            value={phone}
                            onChange={handleOnChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Gender <span className="text-danger">*</span>
                          </label>
                          <Dropdown
                            value={selectedGender}
                            onChange={(e) => setGender(e.value)}
                            options={gender}
                            placeholder="Select Gender"
                            className="select w-100"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Date of birth <span className="text-danger">*</span>
                          </label>
                          <div className="form-icon cus-profile">
                            <Calendar
                              value={date}
                              onChange={(e) => setDate(e.value)}
                              placeholder="DD/MM/YYYY"
                            />
                            <span className="cus-icon">
                              <Icon.Calendar className="react-feather-custom" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label className="col-form-label">
                            Address <span className="text-danger">*</span>
                          </label>
                          <PlacesAutocomplete
                            value={address}
                            onChange={(value) => {
                              setAddress(value);
                            }}
                            onSelect={handleAddressSelect}
                            options={options}
                          >
                            {({
                              getInputProps,
                              suggestions,
                              getSuggestionItemProps,
                              loading,
                            }) => (
                              <div>
                                <input
                                  {...getInputProps({
                                    placeholder: 'Address',
                                    className: 'form-control',
                                  })}
                                />
                                <div className="autocomplete-dropdown-container">
                                  {loading && <div>Loading...</div>}
                                  {suggestions.map((suggestion, index) => (
                                    <div
                                      key={index}
                                      {...getSuggestionItemProps(suggestion, {
                                        className: suggestion.active
                                          ? 'suggestion-item--active'
                                          : 'suggestion-item',
                                      })}
                                    >
                                      <span>{suggestion.description}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </PlacesAutocomplete>
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
                {/* /Service Information */}

                {/* Documents */}
                <fieldset style={{ display: 'block' }}>
                  <div className="card add-service">
                    <div className="sub-title">
                      <h6>
                        Proof of ID
                        <span className="text-danger"> *</span>
                        <br />
                        Can not be expired and must match the name of the
                        account holder (Driving license card, Passport, National
                        identity card, HM Forces identity card, Student card,
                        Employment identification card)
                      </h6>
                    </div>
                    <div className="file-upload">
                      <ImageWithBasePath
                        src="assets/img/icons/upload-icon.svg"
                        alt="image"
                      />
                      <h6>
                        Drag &amp; drop files or <span>Browse</span>
                      </h6>
                      <p>Supported formates: JPEG, PNG, PDF</p>
                      <input
                        type="file"
                        accept="image/jpeg, image/png, application/pdf"
                        onChange={handleProofOfIdChange}
                        multiple
                      />{' '}
                    </div>
                    <div className="file-preview">
                      <ul className="gallery-selected-img">
                        {proofOfId.map((file, index) => (
                          <li key={index}>
                            <div className="img-preview">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Proof of ID ${index + 1}`}
                                style={{ width: '100px', height: '100px' }} // Set the width and height here
                              />
                            </div>
                            <label className="custom_check">
                              <Link
                                to="#"
                                className="remove-gallery"
                                onClick={() => deleteProofOfId(index)}
                              >
                                <Icon.Trash2
                                  style={{ width: '16px', height: '16px' }}
                                />
                              </Link>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="card add-service">
                    <div className="sub-title">
                      <h6>
                        Proof of Address
                        <span className="text-danger"> *</span>
                        <br />
                        Must be issued within the last 3 month, must match the
                        name of the account holder and must display full address
                        (Utility bill, Bank statement, Council tax bill,
                        Mortgage statement)
                      </h6>
                    </div>
                    <div className="file-upload">
                      <ImageWithBasePath
                        src="assets/img/icons/upload-icon.svg"
                        alt="image"
                      />
                      <h6>
                        Drag &amp; drop files or <span>Browse</span>
                      </h6>
                      <p>Supported formates: JPEG, PNG, PDF</p>
                      <input
                        type="file"
                        accept="image/jpeg, image/png, application/pdf"
                        onChange={handleProofOfAddressChange}
                        multiple
                      />{' '}
                    </div>
                    <div className="file-preview">
                      <ul className="gallery-selected-img">
                        {proofOfAddress.map((file, index) => (
                          <li key={index}>
                            <div className="img-preview">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Proof of Address ${index + 1}`}
                                style={{ width: '100px', height: '100px' }} // Set the width and height here
                              />
                            </div>
                            <label className="custom_check">
                              <Link
                                to="#"
                                className="remove-gallery"
                                onClick={() => deleteProofOfAddress(index)}
                              >
                                <Icon.Trash2
                                  style={{ width: '16px', height: '16px' }}
                                />
                              </Link>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
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

                  <div className="field-bottom-btns">
                    <div className="field-btns">
                      <button
                        className="btn btn-primary done_btn"
                        onClick={handleSubmit}
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </fieldset>
                {/* /Docuemnts */}
              </div>
            </div>
          </div>
          {/* /profile-settings */}
        </div>
      </div>
      <>
        {/* Modal Succss */}
        <div
          className="modal fade add-service-modal"
          id="successmodal"
          tabIndex={-1}
          aria-labelledby="successmodal"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <span>
                  <i className="fa-regular fa-circle-check" />
                </span>
                <h3>Success</h3>
                <p>Thanks for updating your profile</p>
                <div className="popup-btn">
                  <a
                    href={routes.providerDashboard}
                    className="btn btn-primary"
                  >
                    Go to Dashboard <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Modal Succss */}
      </>

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

export default ProviderProfileSettings;
