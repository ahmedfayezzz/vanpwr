import React, { useState } from 'react';
import PagesAuthHeader from './common/header';
import { Link, useNavigate } from 'react-router-dom';
import { all_routes } from '../../../../core/data/routes/all_routes';
import axios from 'axios';

const PasswordRecovery = () => {
  const routes = all_routes;
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'https://wgjgzlvwmoavtpeylund.supabase.co/auth/v1/recover?redirect_to=https://vanpowr.com/authentication/reset-password',
        {
          email,
        },
        {
          headers: {
            apiKey: process.env.REACT_APP_BEARER_TOKEN,
          },
        },
      );


      // If the request is successful, navigate to the reset password page
      if (response.status === 200) {
        setIsEmailSent(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <PagesAuthHeader />
      <div className="content">
        <div className="container">
          <div className="row">
            {/* Password Recovery */}
            <div className="col-md-6 col-lg-6 mx-auto">
              <div className="login-wrap">
                <div className="login-header">
                  <h3>Password Recovery</h3>
                  <p>
                    Enter your email and we will send you a link to reset your
                    password.
                  </p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="log-form">
                    <div className="form-group">
                      <label className="col-form-label">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="johndoe@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <button
                    className="btn btn-primary w-100 login-btn"
                    type="submit"
                  >
                    Submit
                  </button>
                  {isEmailSent && (
                    <p className="no-acc mt-3">
                      Email sent successfully. Please check your inbox.
                    </p>
                  )}

                  <p className="no-acc mt-0">
                    Remember Password ? <Link to={routes.login}>Login</Link>
                  </p>
                </form>
              </div>
            </div>
            {/* /Password Recovery */}
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordRecovery;
