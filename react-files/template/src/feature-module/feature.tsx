import React, { useEffect, useState } from 'react';
import AllRoutes from './router/router';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  set_current_route,
  set_current_route_array,
  set_is_mobile_sidebar,
} from '../core/data/redux/action';
import Progress from './frontend/common/progress/progress';
import Cursor from './frontend/common/cursor/cursor';
import {
  AppState,
  CurrentRoute,
  Pageinfos,
  ProviderEarningsadmindatas,
} from '../core/models/interface';

const Feature = () => {
  const toggle_data = useSelector(
    (state: ProviderEarningsadmindatas) => state.ProviderEarningsAdmin,
  );
  const toggle_data_2 = useSelector((state: AppState) => state.toggleSidebar2);
  const mouse_data = useSelector((state: AppState) => state.mouseOverSidebar);

  const location = useLocation();
  const [currentRoute, setCurrentRoute] = useState(location.pathname);
  const current_route = useSelector((state: Pageinfos) => state.current_route);
  const mobileSidebar = useSelector((state: AppState) => state.mobileSidebar);

  const current_route_array = useSelector(
    (state: CurrentRoute) => state.current_route_array,
  );
  const dispatch = useDispatch();
  const getRoutes = () => {
    setCurrentRoute(location.pathname);
    const splitVal = location.pathname.split('/');
    const route_data = {
      base: splitVal[1],
      page: splitVal[2] || '',
      last: splitVal[3] || '',
    };
    dispatch(set_current_route_array(splitVal));
    dispatch(set_current_route(route_data));
    dispatch(set_is_mobile_sidebar(false));
    // console.log(currentRoute)
    // if (location.pathname == currentRoute) {
    //   setCurrentRoute(location.pathname);
    //   const splitVal = location.pathname.split('/');
    //   console.log(splitVal,'inside')
    //   const route_data = {
    //     base: splitVal[1],
    //     page: splitVal[2] || '',
    //     last: splitVal[3] || '',
    //   };
    //   dispatch(set_current_route(route_data));
    // }
  };

  useEffect(() => {
    getRoutes();
  }, [location.pathname, currentRoute]);

  // useEffect(() => {
  //   getRoutes();

  // }, []);
  return (
    <div
      className={`${current_route.base == 'providers' ? 'provider-body' : ''}${
        current_route_array.includes('authentication') ? 'login-body' : ''
      }${current_route.base == 'admin' ? 'admin' : ''} ${
        toggle_data_2 ? 'mini-sidebar' : ''
      } ${mobileSidebar ? 'menu-opened slide-nav' : ''} ${
        mouse_data ? 'expand-menu' : ''
      } ${current_route.base == 'home-five' ? 'home-page-five' : ''}`}
    >
      <div className={`main-wrapper ${toggle_data ? 'menu-opened' : ''}`}>
        <AllRoutes />
      </div>
      <div
        className={`sidebar-overlay ${toggle_data ? 'opened' : ''} ${
          mobileSidebar ? 'opened' : ''
        }`}
      ></div>

      {location.pathname.includes('home') ? <Progress /> : <></>}
      {location.pathname.includes('admin') ? <></> : <Cursor />}
    </div>
  );
};

export default Feature;
