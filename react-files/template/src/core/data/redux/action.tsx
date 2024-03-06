/* eslint-disable @typescript-eslint/no-explicit-any */
export const RESET_STATE = 'RESET_STATE';
export function resetState() {
  return { type: RESET_STATE };
}

export const SET_QUOTES = 'SET_QUOTES';
export const setQuotes = (params: any) => ({
  type: SET_QUOTES,
  payload: params,
});

export const SET_STRIPE = 'SET_STRIPE';
export const setStripe = (params: any) => ({
  type: SET_STRIPE,
  payload: params,
});
export const current_route = () => ({ type: 'CURRENT_ROUTE_DATA' });
export const set_current_route = (payload: any) => ({
  type: 'CURRENT_ROUTE_DATA',
  payload,
});
export const current_route_array = () => ({ type: 'CURRENT_ROUTE_DATA' });
export const set_current_route_array = (payload: any) => ({
  type: 'CURRENT_ROUTE_ARRAY_DATA',
  payload,
});
export const get_is_mobile_sidebar = () => ({ type: 'MOBILE_SIDEBAR' });
export const set_is_mobile_sidebar = (payload: any) => ({
  type: 'MOBILE_SIDEBAR',
  payload,
});
export const toggleSidebar = () => ({ type: 'TOOGLE_SIDEBAR_DATA' });
export const set_toggleSidebar_data = (payload: boolean) => ({
  type: 'TOOGLE_SIDEBAR_DATA',
  payload,
});
export const toggleSidebar2 = () => ({ type: 'TOOGLE_SIDEBAR_DATA_2' });
export const set_toggleSidebar_data_2 = (payload: boolean) => ({
  type: 'TOOGLE_SIDEBAR_DATA_2',
  payload,
});
export const mouseOverSidebar = () => ({ type: 'TOOGLE_MOUSEOVER_DATA' });
export const set_mouseoversidebar_data = (payload: boolean) => ({
  type: 'TOOGLE_MOUSEOVER_DATA',
  payload,
});
export const set_show_loader = (payload: any) => ({
  type: 'SHOW_LOADER',
  payload,
});
