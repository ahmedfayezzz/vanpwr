import React, { useState } from 'react';
import PagesAuthHeader from './common/header';
import * as Icon from 'react-feather';
import { all_routes } from '../../../../core/data/routes/all_routes';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const routes = all_routes;
  const navigate = useNavigate();

  const [searchPararms, setSearchParams] = useSearchParams();

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

  const query = window.location.href.split('#')[1];
  const params = Object.fromEntries(new URLSearchParams(query));

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
      const response = await axios.put(
        'https://wgjgzlvwmoavtpeylund.supabase.co/auth/v1/user',
        {
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${params.access_token}`,
            apiKey: process.env.REACT_APP_BEARER_TOKEN,
          },
        },
      );


      navigate(routes.success);
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
  return (
    <>
      <PagesAuthHeader />
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-6 mx-auto">
              <div className="login-wrap">
                <div className="login-header">
                  <h3>Reset Password</h3>
                  <p>
                    Your new password must be different from previous used
                    passwords.
                  </p>
                </div>
                {/* Reset Password Form */}
                <form onSubmit={handleSubmit}>
                  <div className="log-form">
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
                        {password !== passwords[1]
                          ? 'Passwords must match'
                          : ''}
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary w-100 login-btn"
                    type="submit"
                  >
                    Save Change
                  </button>
                </form>
                {/* /Reset Password Form */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
