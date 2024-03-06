import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useDigitInput from 'react-digit-input';
import ImageWithBasePath from '../../../../core/img/ImageWithBasePath';
import PagesAuthHeader from './common/header';
import { all_routes } from '../../../../core/data/routes/all_routes';
import axios from 'axios';

const EmailOtp = () => {
  const routes = all_routes;
  const navigate = useNavigate();
  const location = useLocation();
  const email = sessionStorage.getItem('email') || location.state.email;
  const role = sessionStorage.getItem('role') || location.state.role;

  const [value, onChange] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      type: 'email',
      email: email,
      token: value,
    };

    try {
      const response = await axios.post(
        'https://wgjgzlvwmoavtpeylund.supabase.co/auth/v1/verify',
        payload,
        {
          headers: {
            apiKey: process.env.REACT_APP_BEARER_TOKEN,
          },
        },
      );

      sessionStorage.setItem('access_token', response.data.access_token);
      sessionStorage.setItem('user_id', response.data.user.id);

      const secondPayload = {
        user_id: response.data.user.id,
        role: role,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${response.data.access_token}`,
          apiKey: process.env.REACT_APP_BEARER_TOKEN,
          Prefer: 'return=minimal',
        },
      };

      const secondResponse = await axios.post(
        'https://wgjgzlvwmoavtpeylund.supabase.co/rest/v1/user_roles',
        secondPayload,
        config,
      );

      if (secondResponse.status === 201) {
        navigate(routes.providerRules);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const digits = useDigitInput({
    acceptedCharacters: /^[0-9]*$/,
    length: 6,
    value,
    onChange,
  });

  return (
    <>
      <PagesAuthHeader />
      <div className="content">
        <div className="container">
          <div className="row">
            {/* Email Otp Form */}
            <div className="col-md-6 col-lg-6 mx-auto">
              <div className="login-wrap otp-wrap">
                <div className="otp-img">
                  <ImageWithBasePath
                    src="assets/img/icons/email-otp.svg"
                    alt="image"
                  />
                </div>
                <div className="login-header">
                  <h3>Email OTP Verification</h3>
                  <p>
                    OTP sent to your Email Address ending{' '}
                    <span>{email ? '******' + email.split('@')[1] : ''}</span>
                  </p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <div className="d-flex passcode-wrap digit-group passcode-verified">
                      <input inputMode="decimal" autoFocus {...digits[0]} />
                      <input inputMode="decimal" {...digits[1]} />
                      <input inputMode="decimal" {...digits[2]} />
                      <input inputMode="decimal" {...digits[3]} />
                      <input inputMode="decimal" {...digits[4]} />
                      <input inputMode="decimal" {...digits[5]} />
                    </div>
                  </div>
                  <button
                    className="btn btn-primary w-100 login-btn mb-0"
                    type="submit"
                  >
                    Verify &amp; Proceed
                  </button>
                </form>
              </div>
            </div>
            {/* /Email Otp Form */}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailOtp;
