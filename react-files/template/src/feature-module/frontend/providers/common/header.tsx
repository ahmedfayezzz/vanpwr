import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { all_routes } from '../../../../core/data/routes/all_routes';
import ImageWithBasePath from '../../../../core/img/ImageWithBasePath';
import { AppState } from '../../../../core/models/interface';
import axios from 'axios';
import AOS from 'aos';

const ProviderHeader = () => {
  const routes = all_routes;
  const access_token = sessionStorage.getItem('access_token');
  const [user, setUser] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState({
    logo: 'assets/img/newLogo.png',
    logoSmall: 'assets/img/logovnbig.jpeg',
    logoSvg: 'assets/img/logovn.svg',
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);

    // Add or remove .menu-opened class on body
    if (!isSidebarOpen) {
      document.body.classList.add('menu-opened');
    } else {
      document.body.classList.remove('menu-opened');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://wgjgzlvwmoavtpeylund.supabase.co/rest/v1/driver?select=*',
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              apikey: process.env.REACT_APP_BEARER_TOKEN,
            },
          },
        );

        console.log('Response:', response); // Log the response
        setUser(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      // Request fullscreen
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }

    // Toggle the state
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <header className="header header-one">
      <div className="container">
        <nav className="navbar navbar-expand-lg header-nav-new">
          <div className="navbar-header">
            <Link onClick={toggleSidebar} id="mobile_btn" to="#">
              <span className="bar-icon">
                <span />
                <span />
                <span />
              </span>
            </Link>
            <Link to={routes.homeOne} className="navbar-brand logo">
              <ImageWithBasePath
                src={imageUrl.logo}
                className="img-fluid"
                alt="Logo"
              />
            </Link>
            <Link to={routes.homeOne} className="navbar-brand logo-small">
              <ImageWithBasePath
                src={imageUrl.logoSmall}
                className="img-fluid"
                alt="Logo"
              />
            </Link>
          </div>
          <div className="main-menu-wrapper">
            <div className="menu-header">
              <Link to={routes.homeOne} className="menu-logo">
                <ImageWithBasePath
                  src={imageUrl.logoSvg}
                  className="img-fluid"
                  alt="Logo"
                />
              </Link>
              <Link
                onClick={toggleSidebar}
                id="menu_close"
                className="menu-close"
                to="#"
              >
                <i className="fas fa-times" />
              </Link>
            </div>
            <ul className="main-nav">
              {isSidebarOpen && (
                <>
                  <li className="has-submenu">
                    <Link
                      to="#"
                      className="dropdown-toggle nav-link"
                      data-bs-toggle="dropdown"
                    >
                      <div className="user-infos">
                        <div className="user-info">
                          <h6>
                            {' '}
                            {user[0]?.first_name} {user[0]?.last_name}
                          </h6>
                          <p>{user[0]?.email_address}</p>
                        </div>
                      </div>
                    </Link>{' '}
                  </li>
                  <li className="has-submenu">
                    <Link to={routes.providerService}>Services</Link>
                  </li>
                  <li className="has-submenu">
                    <Link to={routes.providerBooking}>Bookings</Link>
                  </li>
                  <li className="has-submenu">
                    <Link to={routes.providerAvailableJobs}>
                      Available Jobs
                    </Link>
                  </li>
                  <li className="has-submenu">
                    <Link to={routes.providerProfileSettings}>
                      Profile Settings
                    </Link>
                  </li>
                  <li className="has-submenu">
                    <Link to={routes.ProviderSecuritySettings}>
                      Security Settings
                    </Link>
                  </li>
                  <li className="has-submenu">
                    <Link
                      to={routes.login}
                      onClick={() => {
                        sessionStorage.removeItem('access_token');
                        sessionStorage.removeItem('user_id');
                        sessionStorage.setItem('isLoggedIn', 'false');
                      }}
                    >
                      Log Out
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <ul className="nav user-menu noti-pop-detail ">
            <li className="nav-item  has-arrow dropdown-heads ">
              <Link onClick={toggleFullscreen} to="#" className="win-maximize">
                <i className="feather-maximize">
                  <Icon.Maximize className="react-feather-custom" />
                </i>
              </Link>
            </li>
            {/* User Menu */}
            <li className="nav-item dropdown has-arrow account-item">
              <Link
                to="#"
                className="dropdown-toggle nav-link"
                data-bs-toggle="dropdown"
              >
                <div className="user-infos">
                  <div className="user-info">
                    <h6>
                      {' '}
                      {user[0]?.first_name} {user[0]?.last_name}
                    </h6>
                    <p>{user[0]?.email_address}</p>
                  </div>
                </div>
              </Link>
            </li>
            {/* /User Menu */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default ProviderHeader;
