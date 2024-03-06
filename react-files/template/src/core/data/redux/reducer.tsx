/* eslint-disable @typescript-eslint/no-explicit-any */
import { RESET_STATE, SET_QUOTES, SET_STRIPE } from './action';
const initialState = {
  quotes: [],
  stripe: null,
  current_route: { base: '', page: '', last: '' },
  current_route_array: [],
  mobileSidebar: false,
  toggleSidebar: false,
  toggleSidebar2: false,
  showLoader: true,
  mouseOverSidebar: false,
};

const rootReducer: any = (state = initialState, action: any) => {
  switch (action.type) {
    case RESET_STATE:
      return initialState;
    case SET_QUOTES:
      return { ...state, quotes: action.payload };
    case SET_STRIPE:
      return { ...state, stripe: action.payload };
    case 'CURRENT_ROUTE_DATA':
      return { ...state, current_route: action.payload };
    case 'CURRENT_ROUTE_ARRAY_DATA':
      return { ...state, current_route_array: action.payload };
    case 'MOBILE_SIDEBAR':
      return { ...state, mobileSidebar: action.payload };
    case 'TOOGLE_SIDEBAR_DATA':
      return { ...state, toggleSidebar: action.payload };
    case 'TOOGLE_SIDEBAR_DATA_2':
      return { ...state, toggleSidebar2: action.payload };
    case 'SHOW_LOADER':
      return { ...state, showLoader: action.payload };
    case 'TOOGLE_MOUSEOVER_DATA':
      return { ...state, mouseOverSidebar: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
