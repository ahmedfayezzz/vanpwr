import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Icon from 'react-feather';
import PhoneInput from 'react-phone-input-2';
import ImageWithBasePath from '../../../../core/img/ImageWithBasePath';
import ProviderAuthHeader from './common/header1';
import { all_routes } from '../../../../core/data/routes/all_routes';
import axios from 'axios';

const ProviderSignup = () => {
  const routes = all_routes;
  const navigate = useNavigate();

  const [role, setRole] = useState('driver'); 
  sessionStorage.setItem('role', role);
  const [email, setEmail] = useState('');
  sessionStorage.setItem('email', email);
  const [emailResponse, setEmailResponse] = useState({
    emailResponseText: '',
    emailResponseKey: '',
  });
  const [passwords, setPasswords] = useState(['', '']);
  const [passwordVisibility, setPasswordVisibility] = useState([false, false]);
  const [password, setPassword] = useState('');
  const [passwordResponse, setPasswordResponse] = useState({
    passwordResponseText: '',
    passwordResponseKey: '',
  });

  const togglePasswordVisibility = (index: number) => {
    const updatedVisibility = [...passwordVisibility];
    updatedVisibility[index] = !updatedVisibility[index];
    setPasswordVisibility(updatedVisibility);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== passwords[1]) {
      setPasswordResponse({
        passwordResponseText: 'Passwords must match',
        passwordResponseKey: '',
      });
      return;
    }

    try {
      const response = await axios.post(
        'https://wgjgzlvwmoavtpeylund.supabase.co/auth/v1/signup',
        {
          email,
          password,
        },
        {
          headers: {
            apiKey: process.env.REACT_APP_BEARER_TOKEN,
          },
        },
      );


      navigate(routes.emailOtp, {
        state: {
          email,
          role,
        },
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const onChangePassword = (password: string) => {
    setPassword(password);
    if (password.match(/^$|\s+/)) {
      setPasswordResponse({
        passwordResponseText: 'Whitespaces are not allowed',
        passwordResponseKey: '',
      });
    } else if (password.length === 0) {
      setPasswordResponse({
        passwordResponseText: '',
        passwordResponseKey: '',
      });
    } else if (password.length < 8) {
      setPasswordResponse({
        passwordResponseText: 'Weak. Must contain at least 8 characters',
        passwordResponseKey: '0',
      });
    } else if (
      password.search(/[a-z]/) < 0 ||
      password.search(/[A-Z]/) < 0 ||
      password.search(/[0-9]/) < 0
    ) {
      setPasswordResponse({
        passwordResponseText:
          'Average. Must contain at least 1 upper case and number',
        passwordResponseKey: '1',
      });
    } else if (password.search(/(?=.*?[#?!@$%^&*-])/) < 0) {
      setPasswordResponse({
        passwordResponseText: 'Almost. Must contain a special symbol',
        passwordResponseKey: '2',
      });
    } else {
      setPasswordResponse({
        passwordResponseText: 'Awesome! You have a secure password.',
        passwordResponseKey: '3',
      });
    }
  };

  const onChangeEmail = (email: string) => {
    setEmail(email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.match(/^$|\s+/)) {
      setEmailResponse({
        emailResponseText: 'Whitespaces are not allowed',
        emailResponseKey: '',
      });
    } else if (email.length === 0) {
      setEmailResponse({
        emailResponseText: '',
        emailResponseKey: '',
      });
    } else if (!emailRegex.test(email)) {
      setEmailResponse({
        emailResponseText: 'Invalid. Must be a valid email address',
        emailResponseKey: '0',
      });
    } else {
      setEmailResponse({
        emailResponseText: 'Awesome! You have a valid email address.',
        emailResponseKey: '1',
      });
    }
  };

  return (
    <>
      <ProviderAuthHeader />
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-6 mx-auto">
              <div className="login-wrap">
                <div className="login-header">
                  <h3>Provider Signup</h3>
                </div>
                {/* Signup Form */}
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="col-form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="johndoe@example.com"
                      onChange={(e) => onChangeEmail(e.target.value)}
                      required
                    />
                    <div
                      id="passwordInfo"
                      className={
                        emailResponse.emailResponseKey === '0'
                          ? 'invalid'
                          : emailResponse.emailResponseKey === '1'
                          ? 'valid'
                          : ''
                      }
                    >
                      {emailResponse.emailResponseText}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="col-form-label">New Password</label>
                    <div className="pass-group" id="passwordInput">
                      <input
                        type={passwordVisibility[0] ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => onChangePassword(e.target.value)}
                        className="form-control pass-input"
                        placeholder="*************"
                        required
                      />
                      <span
                        className="toggle-password"
                        onClick={() => togglePasswordVisibility(0)}
                      >
                        {passwordVisibility[0] ? (
                          <Icon.Eye className="react-feather-custom" />
                        ) : (
                          <Icon.EyeOff className="react-feather-custom" />
                        )}
                      </span>
                    </div>
                    <div
                      className={`password-strength ${
                        passwordResponse.passwordResponseKey === '0'
                          ? 'poor-active'
                          : passwordResponse.passwordResponseKey === '1'
                          ? 'avg-active'
                          : passwordResponse.passwordResponseKey === '2'
                          ? 'strong-active'
                          : passwordResponse.passwordResponseKey === '3'
                          ? 'heavy-active'
                          : ''
                      }`}
                      id="passwordStrength"
                    >
                      <span id="poor" className="active"></span>
                      <span id="weak" className="active"></span>
                      <span id="strong" className="active"></span>
                      <span id="heavy" className="active"></span>
                    </div>
                    <div
                      id="passwordInfo"
                      className={
                        passwordResponse.passwordResponseKey === '0'
                          ? 'weak'
                          : passwordResponse.passwordResponseKey === '1'
                          ? 'average'
                          : passwordResponse.passwordResponseKey === '2'
                          ? 'good'
                          : passwordResponse.passwordResponseKey === '3'
                          ? 'great'
                          : ''
                      }
                    >
                      {passwordResponse.passwordResponseText}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Confirm Password</label>
                    <div className="pass-group">
                      <input
                        type={passwordVisibility[1] ? 'text' : 'password'}
                        className="form-control pass-input"
                        placeholder="*************"
                        value={passwords[1]}
                        onChange={(e) => {
                          const updatedPasswords = [...passwords];
                          updatedPasswords[1] = e.target.value;
                          setPasswords(updatedPasswords);
                        }}
                        required
                      />
                      <span
                        className="toggle-password"
                        onClick={() => togglePasswordVisibility(1)}
                      >
                        {passwordVisibility[1] ? (
                          <Icon.Eye className="react-feather-custom" />
                        ) : (
                          <Icon.EyeOff className="react-feather-custom" />
                        )}
                      </span>
                    </div>
                    <div
                      id="passwordInfo"
                      className={password !== passwords[1] ? 'weak' : ''}
                    >
                      {password !== passwords[1] ? 'Passwords must match' : ''}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-100 login-btn"
                  >
                    Signup
                  </button>
                  <p className="no-acc">
                    Already have an account ?{' '}
                    <Link to={routes.login}> Sign In</Link>
                  </p>
                </form>
                {/* /Signup Form */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProviderSignup;
