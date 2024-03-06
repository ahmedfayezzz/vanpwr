import React, { useState } from 'react';
import * as Icon from 'react-feather';
import ImageWithBasePath from '../../../../core/img/ImageWithBasePath';
import PagesAuthHeader from './common/header';
import { Link, useNavigate } from 'react-router-dom';
import { all_routes } from '../../../../core/data/routes/all_routes';
import axios from 'axios';

const Login = () => {
  const routes = all_routes;
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setEmailError('');
    setPasswordError('');

    try {
      const response = await axios.post(
        'https://wgjgzlvwmoavtpeylund.supabase.co/auth/v1/token?grant_type=password',
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


      sessionStorage.setItem('access_token', response.data.access_token);
      sessionStorage.setItem('user_id', response.data.user.id);
      sessionStorage.setItem('expires_at', response.data.expires_at);

      const config = {
        headers: {
          Authorization: `Bearer ${response.data.access_token}`,
          apiKey: process.env.REACT_APP_BEARER_TOKEN,
        },
      };

      const secondResponse = await axios.get(
        `https://wgjgzlvwmoavtpeylund.supabase.co/rest/v1/user_roles?user_id=eq.${response.data.user.id}&select=role`,
        config,
      );

      if (secondResponse.data[0].role === 'driver') {
        navigate(routes.providerService);
        sessionStorage.setItem('isLoggedIn', 'true');
      }
    } catch (error) {
      console.error('Error:', error);

      // If the login fails, display an error message
      if (error.response && error.response.status === 400) {
        setPasswordError('Invalid email or password');
      }
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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
                  <h3>Login</h3>
                  <p>Please enter your details</p>
                </div>
                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                  <div className="log-form">
                    <div className="form-group">
                      <label className="col-form-label">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="johndoe@example.com"
                        value={email}
                        onChange={handleEmailChange}
                        required
                      />
                      {emailError && <div className="error">{emailError}</div>}
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col">
                          <label className="col-form-label">Password</label>
                        </div>
                        <div className="col-auto">
                          <Link
                            className="forgot-link"
                            to={routes.passwordRecovery}
                          >
                            Forgot password?
                          </Link>
                        </div>
                      </div>
                      <div className="pass-group">
                        <input
                          type={passwordVisible ? 'text' : 'password'}
                          className="form-control pass-input"
                          placeholder="*************"
                          value={password}
                          onChange={handlePasswordChange}
                          required
                        />
                        <span
                          className="toggle-password"
                          onClick={togglePasswordVisibility}
                        >
                          {passwordVisible ? (
                            <Icon.Eye className="react-feather-custom" />
                          ) : (
                            <Icon.EyeOff className="react-feather-custom" />
                          )}
                        </span>
                      </div>
                      <br />
                      {passwordError && (
                        <div id="passwordInfo">{passwordError}</div>
                      )}
                    </div>
                  </div>
                  <button
                    className="btn btn-primary w-100 login-btn"
                    type="submit"
                  >
                    Login
                  </button>
                  <p className="no-acc">
                    Dont have an account ?{' '}
                    <Link to={routes.chooseSignUp}>Register</Link>
                  </p>
                </form>
                {/* /Login Form */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
