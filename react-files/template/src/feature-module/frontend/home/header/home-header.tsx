import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { all_routes } from '../../../../core/data/routes/all_routes';
import ImageWithBasePath from '../../../../core/img/ImageWithBasePath';
import { set_toggleSidebar_data } from '../../../../core/data/redux/action';
import * as Icon from 'react-feather';

type props = {
  type: number;
};

const HomeHeader: React.FC<props> = ({ type }) => {
  const routes = all_routes;
  const [imageUrl, setImageUrl] = useState({
    logo: '',
    logoSmall: '',
    logoSvg: '',
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);

    // Add or remove .menu-opened class on body
    if (!isSidebarOpen) {
      document.body.classList.add('menu-opened');
    } else {
      document.body.classList.remove('menu-opened');
    }
  };

  const routerPath = (pathType: number) => {
    if (pathType === 1) {
      return { path: routes.homeOne, className: 'header-one' };
    }
    return { path: routes.homeOne, className: 'header-one' };
  };

  const renderButtons = (pathType: number) => {
    if (pathType === 1) {
      return (
        <ul className="nav header-navbar-rht">
          <li className="nav-item">
            <Link
              className="nav-link header-reg"
              to="/authentication/choose-signup"
            >
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link header-login" to="/authentication/login">
              <Icon.Users className="react-feather-custom me-1 mb-1" />
              Login
            </Link>
          </li>
        </ul>
      );
    }
    return null;
  };

  useEffect(() => {
    if (type === 1) {
      setImageUrl({
        logo: 'assets/img/newLogo.png',
        logoSmall: 'assets/img/logovnbig.jpeg',
        logoSvg: 'assets/img/logovn.svg',
      });
    }
  }, [type]);

  return (
    <header className={`header ${routerPath(type).className}`}>
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
            <Link to={routerPath(type).path} className="navbar-brand logo">
              <ImageWithBasePath
                src={imageUrl.logo}
                className="img-fluid"
                alt="Logo"
              />
            </Link>
            <Link
              to={routerPath(type).path}
              className="navbar-brand logo-small"
            >
              <ImageWithBasePath
                src={imageUrl.logoSmall}
                className="img-fluid"
                alt="Logo"
              />
            </Link>
          </div>
          <div className="main-menu-wrapper">
            <div className="menu-header">
              <Link to={routerPath(type).path} className="menu-logo">
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
              <li className="has-submenu">
                <Link to={routes.homeOne}>Home</Link>
              </li>
              <li className="has-submenu">
                <Link to={routes.contactUs}>Contact Us</Link>
              </li>
              <li className="has-submenu">
                <Link to={routes.faq}>FAQ</Link>
              </li>
              {isSidebarOpen && (
                <>
                  <li className="has-submenu">
                    <Link to={routes.chooseSignUp}>Register</Link>
                  </li>
                  <li className="has-submenu">
                    <Link to={routes.login}>Login</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          {renderButtons(type)}
        </nav>
      </div>
    </header>
  );
};

export default HomeHeader;
