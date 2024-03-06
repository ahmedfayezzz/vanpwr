import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import ImageWithBasePath from '../../../../core/img/ImageWithBasePath';
import { useSelector } from 'react-redux';
import * as Icon from 'react-feather';
import { all_routes } from '../../../../core/data/routes/all_routes';
import { CurrentRoute } from '../../../../core/models/interface';

const FooterOne = () => {
  const routes = all_routes;

  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedValue, setselectedValue] = useState(null);

  const language = [
    { name: 'English' },
    { name: 'France' },
    { name: 'Spanish' },
  ];
  const value = [{ name: 'US Dollars' }, { name: 'INR' }, { name: 'Kuwait' }];
  const current_route_array = useSelector(
    (state: CurrentRoute) => state.current_route_array,
  );

  return (
    <>
      {!current_route_array.includes('authentication') ? (
        <footer className="footer">
          <div className="footer-top">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="footer-widget footer-menu">
                    <h2 className="footer-title">Quick Links</h2>
                    <ul>
                      <li>
                        <Link to={routes.faq}>FAQ</Link>
                      </li>
                      <li>
                        <Link to={routes.contactUs}>Contact Us</Link>
                      </li>
                      <li>
                        <Link to={routes.providerSignup}>Become a Driver</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="footer-widget footer-contact">
                    <h2 className="footer-title">Contact Us</h2>
                    <div className="footer-contact-info">
                      <div className="footer-opening">
                        <p>
                          <span>
                            <Icon.Clock className="react-feather-custom" />
                          </span>{' '}
                          Opening Hours
                          <br />
                          Monday - Sunday
                          <br />
                          06:00 - 23:59 <br />
                        </p>
                      </div>
                      <p className="mb-0">
                        <span>
                          <Icon.Mail className="react-feather-custom" />
                        </span>{' '}
                        hello@vanpowr.com
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="footer-widget">
                    <h2 className="footer-title">Follow Us</h2>
                    <div className="social-icon">
                      <ul>
                        <li>
                          <Link
                            to={
                              'https://m.facebook.com/people/Vanpowr/100083308780785/'
                            }
                            target="_blank"
                          >
                            <i className="fa-brands fa-facebook"></i>{' '}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={'https://mobile.twitter.com/vanpowruk'}
                            target="_blank"
                          >
                            <i className="fab fa-x"></i>{' '}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={' https://www.instagram.com/vanpowr/'}
                            target="_blank"
                          >
                            <i className="fa-brands fa-instagram"></i>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={
                              'https://www.tiktok.com/@vanpowr?_t=8jTbF74EOy8&_r=1'
                            }
                            target="_blank"
                          >
                            <i className="fa-brands fa-tiktok"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="container">
              <div className="copyright">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <div className="copyright-text">
                      <p className="mb-0">
                        Copyright &copy; 2024. All Rights Reserved.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="copyright-menu">
                      <ul className="policy-menu">
                        <li>
                          <Link to={routes.privacyPolicy}>Privacy Policy</Link>
                        </li>
                        <li>
                          <Link to={routes.termsCondition}>
                            Terms & Conditions
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      ) : null}
    </>
  );
};

export default FooterOne;
