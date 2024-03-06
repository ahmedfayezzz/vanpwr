import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars-2';
import * as Icon from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { set_mouseoversidebar_data } from '../../../../core/data/redux/action';
import { all_routes } from '../../../../core/data/routes/all_routes';
import ImageWithBasePath from '../../../../core/img/ImageWithBasePath';
import { AppState } from '../../../../core/models/interface';
import axios from 'axios';

const ProviderSidebar = () => {
  const routes = all_routes;
  const access_token = sessionStorage.getItem('access_token');
  const [user, setUser] = useState([]);
  const location = useLocation();
  const toggle_data = useSelector((state: AppState) => state.mouseOverSidebar);
  const dispatch = useDispatch();
  const [subdroptoggle, setsubdroptoggle] = useState(false);
  const [subdroptoggle2, setsubdroptoggle2] = useState(false);
  const activeRouterPath = (link: string) => {
    return link === location.pathname;
  };
  const activeRouterPath2 = () => {
    return location.pathname.includes('settings');
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

        setUser(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="sidebar" id="sidebar">
    <div className="sidebar-inner slimscroll">
      <Scrollbars>
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li
              className={`${
                activeRouterPath('/providers/provider-service') ? 'active' : ''
              }`}
            >
              <Link to="/providers/provider-service">
                <Icon.Briefcase className="react-feather-icon" />{' '}
                <span>My Services</span>
              </Link>
            </li>
            <li
              className={`${
                activeRouterPath('/providers/provider-booking') ? 'active' : ''
              }`}
            >
              <Link to="/providers/provider-booking">
                <Icon.Calendar className="react-feather-icon" />{' '}
                <span>Bookings </span>
              </Link>
            </li>
            <li
              className={`${
                activeRouterPath('/providers/provider-available-jobs')
                  ? 'active'
                  : ''
              }`}
            >
              <Link to={'/providers/provider-available-jobs'}>
                <Icon.CreditCard className="react-feather-icon" />{' '}
                <span>Available Jobs</span>
              </Link>
            </li>
            <li className={`submenu ${activeRouterPath2() ? 'active' : ''}`}>
              <Link
                to="#"
                onClick={() => setsubdroptoggle(!subdroptoggle)}
                className={`${subdroptoggle ? 'subdrop' : ''}`}
              >
                <Icon.Settings className="react-feather-icon" />{' '}
                <span>Settings</span> <span className="menu-arrow" />
              </Link>
              <ul style={{ display: subdroptoggle ? 'block' : 'none' }}>
                <li
                  className={`${
                    activeRouterPath(
                      '/providers/settings/provider-profile-settings',
                    )
                      ? 'active'
                      : ''
                  }`}
                >
                  <Link to="/providers/settings/provider-profile-settings">
                    Account Settings
                  </Link>
                </li>

                <li
                  className={`${
                    activeRouterPath(
                      '/providers/settings/provider-security-settings',
                    )
                      ? 'active'
                      : ''
                  }`}
                >
                  <Link to="/providers/settings/provider-security-settings">
                    Security Setting
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                to={routes.login}
                onClick={() => {
                  sessionStorage.removeItem('access_token');
                  sessionStorage.removeItem('user_id');
                  sessionStorage.setItem('isLoggedIn', 'false');
                }}
              >
                <Icon.LogOut className="react-feather-icon" />{' '}
                <span>Logout</span>
              </Link>
            </li>
          </ul>
          <div className="menu-bottom">
            <div className="menu-user">
              <div className="menu-user-info">
              {user[0]?.first_name} {user[0]?.last_name}
                <i className="feather-check text-success" />
                <p>{user[0]?.email_address}</p>
              </div>
            </div>
            <Link
              to="#"
              onClick={() => setsubdroptoggle2(!subdroptoggle2)}
              className={` select-set ${subdroptoggle2 ? 'subdrop' : ''}`}
            >
              <Icon.Settings className="react-feather-icon" />
            </Link>
          </div>
        </div>
      </Scrollbars>
      <div
        className="dropdown-menu user-drop"
        id="dropboxes"
        style={{ display: subdroptoggle2 ? 'block' : 'none' }}
      >
        <div className="menu-user">
          <div className="menu-user-info">
            <h6>
              {' '}
              {user[0]?.first_name} {user[0]?.last_name}
            </h6>
          </div>
        </div>

        <ul className="set-menu">
          <li>
          <Link to={routes.providerProfileSettings}>
              <Icon.Settings className="react-feather-icon me-2" /> Settings
            </Link>
          </li>
          <li>
            <Link to={routes.ProviderSecuritySettings}>
              <Icon.User className="react-feather-icon me-2" /> Your Account
            </Link>
          </li>
        </ul>
        <ul className="help-menu">
          <li>
            <Link to={routes.termsCondition}>Terms of Condition</Link>
          </li>
          <li>
            <Link to={routes.privacyPolicy}>Privacy Policy</Link>
          </li>
        </ul>
      </div>
      <div
        className="dropdown-menu user-drop"
        id="dropboxes"
        style={{ display: subdroptoggle2 ? 'block' : 'none' }}
      >
        <div className="menu-user">
          <div className="menu-user-info">
            <h6>
              {' '}
              {user[0]?.first_name} {user[0]?.last_name}
            </h6>
          </div>
        </div>

        <ul className="set-menu">
          <li>
            <Link to={routes.providerProfileSettings}>
              <Icon.Settings className="react-feather-icon me-2" /> Settings
            </Link>
          </li>
          <li>
            <Link to={routes.ProviderSecuritySettings}>
              <Icon.User className="react-feather-icon me-2" /> Your Account
            </Link>
          </li>
        </ul>
        <ul className="help-menu">
          <li>
            <Link to={routes.termsCondition}>Terms of Condition</Link>
          </li>
          <li>
            <Link to={routes.privacyPolicy}>Privacy Policy</Link>
          </li>
        </ul>
      </div>
    </div>
  </div>
  );
};

export default ProviderSidebar;
